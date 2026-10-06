#!/usr/bin/env python3
"""Scope the homepage mockup stylesheet to the kit: every selector lives under .wk.

Usage: python3 tools/scope-css.py mockup.css > assets/css/wulf-kit-base.css
Rules that only made sense in the concept page (concept note, photo-spot tags, skip link) are dropped.
"""
import re
import sys

DROP = ('.note', 'show-slots', '.skip', '.sig-slot')


def split_rules(css):
    """Yield (prelude, body) for each top-level block; nested @media bodies are returned raw."""
    i, n = 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0:
            break
        prelude = css[i:j].strip()
        depth, k = 1, j + 1
        while k < n and depth:
            if css[k] == '{':
                depth += 1
            elif css[k] == '}':
                depth -= 1
            k += 1
        yield prelude, css[j + 1:k - 1]
        i = k


def scope_sel(sel):
    sel = sel.strip()
    if not sel:
        return sel
    if sel == ':root':
        return '.wk'
    if sel == 'body':
        return '.wk'
    if sel == '*':
        return '.wk, .wk *'
    if sel in ('*::before', '*::after'):
        return '.wk ' + sel
    if sel.startswith('.wk'):
        return sel
    return '.wk ' + sel


def process(css):
    out = []
    for prelude, body in split_rules(css):
        if prelude.startswith('/*'):
            # comments ride along with the next prelude
            prelude = re.sub(r'/\*[\s\S]*?\*/', '', prelude).strip()
        if prelude.startswith('@media') or prelude.startswith('@supports'):
            inner = process(body)
            if inner.strip():
                out.append(f'{prelude} {{\n{inner}}}\n')
            continue
        if prelude.startswith('@keyframes') or prelude.startswith('@font-face'):
            out.append(f'{prelude} {{{body}}}\n')
            continue
        if prelude == 'html':
            continue
        sels = [s for s in prelude.split(',')]
        if any(d in prelude for d in DROP):
            sels = [s for s in sels if not any(d in s for d in DROP)]
            if not sels:
                continue
        if prelude == 'body':
            body = re.sub(r'\s*(margin|overflow-x|background)\s*:[^;]+;', '', body)
        new = ', '.join(scope_sel(s) for s in sels)
        out.append(f'{new} {{{body}}}\n')
    return ''.join(out)


src = open(sys.argv[1], encoding='utf-8').read()
src = re.sub(r'/\*[\s\S]*?\*/', '', src)
sys.stdout.write(process(src))
