#!/usr/bin/env python3
"""
Build om-catalog.build.css from om-catalog.css.

Sites style every paragraph and heading from Elementor's Site Settings
(".elementor-kit-5 h3 { font-size: 38px }"), and themes do the same with
rules like ".entry-content p". Those carry one class plus one element
(0,1,1) and beat the plugin's one-class rules (".om-card-title", 0,1,0):
card titles came out 38px, the result count sat above the chips.

This script raises every plugin selector with no ids and at most one
class/attribute/pseudo-class by two elements ("html body …"): 0,1,0
becomes 0,1,2, which outranks those global rules. Relative order inside
the plugin is kept (every low rule gets the same +2), and anything with
two or more classes, including every Elementor widget Style control
({{WRAPPER}} …, 0,3,0 and up), still wins as before.

Edit om-catalog.css, then run:  python3 tools/build-css.py
"""
import os
import re
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'om-catalog-integration', 'assets', 'css')
SRC = os.path.join(ROOT, 'om-catalog.css')
OUT = os.path.join(ROOT, 'om-catalog.build.css')

PREFIX = 'html body '


def split_top(text, sep=','):
    """Split on sep outside (), [] and strings."""
    parts, depth, cur, quote = [], 0, '', ''
    for ch in text:
        if quote:
            cur += ch
            if ch == quote:
                quote = ''
            continue
        if ch in '"\'':
            quote = ch
        elif ch in '([':
            depth += 1
        elif ch in ')]':
            depth -= 1
        elif ch == sep and depth == 0:
            parts.append(cur)
            cur = ''
            continue
        cur += ch
    parts.append(cur)
    return parts


def specificity(sel):
    """(ids, classes, elements) of one complex selector."""
    a = b = c = 0
    i, n = 0, len(sel)
    while i < n:
        ch = sel[i]
        if ch == '#':
            a += 1
            i += 1
            while i < n and (sel[i].isalnum() or sel[i] in '-_\\'):
                i += 1
        elif ch == '.':
            b += 1
            i += 1
            while i < n and (sel[i].isalnum() or sel[i] in '-_\\'):
                i += 1
        elif ch == '[':
            b += 1
            depth = 1
            i += 1
            while i < n and depth:
                if sel[i] == '[':
                    depth += 1
                elif sel[i] == ']':
                    depth -= 1
                i += 1
        elif ch == ':':
            if sel[i:i + 2] == '::':
                c += 1
                i += 2
                while i < n and (sel[i].isalnum() or sel[i] == '-'):
                    i += 1
                if i < n and sel[i] == '(':
                    depth = 1
                    i += 1
                    while i < n and depth:
                        depth += {'(': 1, ')': -1}.get(sel[i], 0)
                        i += 1
                continue
            i += 1
            start = i
            while i < n and (sel[i].isalnum() or sel[i] == '-'):
                i += 1
            name = sel[start:i].lower()
            args = ''
            if i < n and sel[i] == '(':
                depth = 1
                j = i + 1
                while j < n and depth:
                    depth += {'(': 1, ')': -1}.get(sel[j], 0)
                    j += 1
                args = sel[i + 1:j - 1]
                i = j
            if name == 'where':
                continue
            if name in ('is', 'not', 'has', 'matches'):
                best = (0, 0, 0)
                for part in split_top(args):
                    best = max(best, specificity(part.strip()))
                a, b, c = a + best[0], b + best[1], c + best[2]
            elif name in ('before', 'after', 'first-line', 'first-letter', 'marker', 'placeholder', 'selection', 'backdrop'):
                c += 1  # Legacy one-colon pseudo-elements.
            else:
                b += 1
        elif ch.isalpha():
            c += 1
            while i < n and (sel[i].isalnum() or sel[i] in '-_'):
                i += 1
        else:
            i += 1  # Combinators, *, spaces.
    return (a, b, c)


def raise_selector(sel):
    stripped = sel.strip()
    if not stripped:
        return sel
    low = stripped.lower()
    if low.startswith(('html', 'body', ':root')) or ':root' in low:
        return sel
    a, b, c = specificity(stripped)
    if a == 0 and b <= 1:
        lead = sel[:len(sel) - len(sel.lstrip())]
        return lead + PREFIX + stripped + sel[len(sel.rstrip()):]
    return sel


def transform(css):
    out = []
    i, n = 0, len(css)
    stack = []  # Kinds of the open blocks: 'rule', 'group' (@media...), 'raw' (@keyframes...).
    buf = ''
    while i < n:
        ch = css[i]
        if css.startswith('/*', i):
            end = css.find('*/', i + 2)
            end = n if end == -1 else end + 2
            out.append(buf)
            buf = ''
            out.append(css[i:end])
            i = end
            continue
        if ch in '"\'':
            end = i + 1
            while end < n and css[end] != ch:
                end += 2 if css[end] == '\\' else 1
            buf += css[i:end + 1]
            i = end + 1
            continue
        if ch == '{':
            prelude = buf
            head = prelude.strip()
            inside_raw = 'raw' in stack or 'rule' in stack
            if head.startswith('@'):
                kind = 'group' if re.match(r'@(media|supports|container|layer|scope|document)\b', head) else 'raw'
                out.append(prelude)
            elif inside_raw:
                kind = 'rule'
                out.append(prelude)
            else:
                kind = 'rule'
                out.append(','.join(raise_selector(s) for s in split_top(prelude)))
            out.append('{')
            stack.append(kind)
            buf = ''
            i += 1
            continue
        if ch == '}':
            out.append(buf)
            out.append('}')
            buf = ''
            if stack:
                stack.pop()
            i += 1
            continue
        buf += ch
        i += 1
    out.append(buf)
    return ''.join(out)


def main():
    with open(SRC, encoding='utf-8') as f:
        css = f.read()
    built = '/* Built from om-catalog.css by tools/build-css.py. Do not edit. */\n' + transform(css)
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(built)
    print('wrote', os.path.relpath(OUT), len(built), 'bytes')


if __name__ == '__main__':
    sys.exit(main())
