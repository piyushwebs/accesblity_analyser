const puppeteer = require("puppeteer");
const axeCore = require("axe-core");

// 4. Global browser instance to reuse across requests
let globalBrowser = null;

const getBrowser = async () => {
  if (!globalBrowser) {
    globalBrowser = await puppeteer.launch({
      headless: true, // Run headless for max speed
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox', 
        '--disable-web-security', 
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-dev-shm-usage', // Recommended for better memory management
        '--disable-gpu' // Disabling GPU for stability
      ]
    });
  }
  return globalBrowser;
};

exports.scanPage = async (url) => {
  let page = null;
  try {
    const browser = await getBrowser();
    page = await browser.newPage();
    await page.setBypassCSP(true);

    // 2. Block unnecessary resources to speed up page load
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (['image', 'font', 'media', 'stylesheet'].includes(resourceType)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // 1. Optimize page loading (domcontentloaded + shorter timeout)
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 15000, // 15 seconds max timeout
    });

    await page.addScriptTag({ content: axeCore.source });

    // 3. Optimize axe-core execution
    const results = await page.evaluate(async () => {
      return await axe.run({
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa'] // Only run necessary rules
        },
        rules: {
          'color-contrast': { enabled: false } // Disable heavy color contrast rule
        }
      });
    });

    const summary = {
      passes: results.passes.length,
      violations: results.violations.length,
      inapplicable: results.inapplicable.length,
      timestamp: results.timestamp,
      url: results.url,
    };

    return {
      url: results.url,
      summary,
      violations: results.violations,
      passes: results.passes,
      rawResult: results,
    };
  } catch (err) {
    console.error('Puppeteer/axe error: ', err);
    throw err;
  } finally {
    // 5. Crucial: Close the page to free memory, but leave the browser process running!
    if (page) {
      await page.close();
    }
  }
};
