
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Test desktop view
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:8000');
  await page.screenshot({ path: 'screenshot-desktop.png' });

  // Test tablet view
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('http://localhost:8000');
  await page.screenshot({ path: 'screenshot-tablet.png' });

  // Test mobile view
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:8000');
  await page.screenshot({ path: 'screenshot-mobile.png' });

  await browser.close();
})();
