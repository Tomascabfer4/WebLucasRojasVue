const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`PAGE LOG [${msg.type()}]:`, msg.text());
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`);
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  await page.goto('http://localhost:5173/');
  
  console.log('--- Navigating to Soluciones ---');
  await page.goto('http://localhost:5173/soluciones');
  
  console.log('--- Navigating back to Inicio ---');
  const html = await page.content();
  console.log('HTML length: ', html.length);
  console.log('Contains id="app": ', html.includes('id="app"'));
  console.log('Contains "SiteHeader": ', html.includes('<header'));
  console.log('Contains "/soluciones": ', html.includes('href="/soluciones"'));
})();
