const puppeteer = require("puppeteer");
const axeCore = require("axe-core");

exports.scanPage = async (url) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
    });
    const page = await browser.newPage();
    await page.setBypassCSP(true);

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000, // 30 seconds
    });

    await page.addScriptTag({ content: axeCore.source });

    const results = await page.evaluate(async () => {
      return await axe.run();
    });

    await browser.close();

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
    console.error("Puppeteer/axe error: ", err);
    throw err;
  }
};
