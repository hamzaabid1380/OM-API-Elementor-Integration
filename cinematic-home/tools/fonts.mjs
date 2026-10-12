
// Optional: in sandboxes whose browser cannot reach Google Fonts directly, serve a
// local copy (fonts.css + woff2 files fetched once with curl). Skipped when absent.
export async function routeFonts(ctx, cacheDir) {
  const fs = await import('fs');
  if (!fs.existsSync(cacheDir + '/fonts.css')) return;
  await ctx.route('https://fonts.googleapis.com/**', (route) => route.fulfill({ status: 200, contentType: 'text/css', body: fs.readFileSync(cacheDir + '/fonts.css', 'utf8') }));
  await ctx.route('https://fonts.gstatic.com/**', (route) => {
    const f = route.request().url().replace('https://fonts.gstatic.com/', '').replace(/\//g, '_');
    const p = cacheDir + '/' + f;
    if (fs.existsSync(p)) return route.fulfill({ status: 200, contentType: 'font/woff2', body: fs.readFileSync(p), headers: { 'access-control-allow-origin': '*' } });
    return route.abort();
  });
}
