
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Generate different sizes
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
  ];
  
  for (const config of sizes) {
    await page.setViewport({ width: config.size, height: config.size });
    await page.goto('file://' + __dirname + '/favicon-generator.html', { waitUntil: 'networkidle0' });
    
    const screenshot = await page.screenshot({ 
      type: 'png',
      fullPage: false
    });
    
    fs.writeFileSync(config.name, screenshot);
    console.log('Generated: ' + config.name);
  }
  
  // Generate ICO file (convert from 32x32 PNG)
  console.log('Favicon files generated successfully!');
  
  await browser.close();
})();
