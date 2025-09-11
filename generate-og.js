
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto('file://' + __dirname + '/og-image.html', { waitUntil: 'networkidle0' });
  
  const screenshot = await page.screenshot({ 
    type: 'png',
    fullPage: false
  });
  
  fs.writeFileSync('og-image.png', screenshot);
  console.log('OG image generated: og-image.png');
  
  await browser.close();
})();
