// Headless Chromium for the capture tools. Uses the project's playwright if it is
// installed, otherwise a global one (PLAYWRIGHT_MODULE). CHROMIUM_PATH picks a browser.
// SwiftShader keeps WebGL working on machines without a GPU.
const mod = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_MODULE || '/opt/node22/lib/node_modules/playwright/index.mjs'));
export const chromium = mod.chromium;
export const launch = () => chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
export const PAGE = 'dist/wulf-cinematic-home.html';
