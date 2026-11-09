/* Real Chrome smoke checks at representative breakpoints. Zero app framework required. */
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mime = { ".html":"text/html", ".css":"text/css", ".js":"application/javascript",
 ".svg":"image/svg+xml", ".webp":"image/webp", ".png":"image/png", ".txt":"text/plain", ".xml":"application/xml" };
const server = createServer((request, response) => {
  let requested = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  if (requested.endsWith("/")) requested += "index.html";
  const file = path.resolve(root, "." + requested);
  if (!file.startsWith(root + path.sep) || !existsSync(file)) {
    response.writeHead(404); response.end("Not found"); return;
  }
  response.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
  response.end(readFileSync(file));
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const baseURL = "http://127.0.0.1:" + server.address().port;
const binaries = [process.env.CHROME_PATH, "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable",
 "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean);
const chromePath = binaries.find(existsSync);
let browser;
try {
  browser = await chromium.launch(chromePath
    ? { executablePath: chromePath, headless: true, args: ["--no-sandbox"] }
    : { headless: true, args: ["--no-sandbox"] });
  for (const width of [320, 390, 768, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 820 }, reducedMotion: "reduce" });
    await page.goto(baseURL + "/", { waitUntil: "domcontentloaded" });
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      heading: document.querySelector("h1")?.getBoundingClientRect().toJSON(),
      header: document.querySelector(".site-header")?.getBoundingClientRect().toJSON(),
      hero: document.querySelector(".hero-photo img")?.complete &&
            document.querySelector(".hero-photo img")?.naturalWidth > 0
    }));
    assert.ok(metrics.scrollWidth <= metrics.innerWidth + 1,
      `horizontal overflow at ${width}px: ${metrics.scrollWidth} > ${metrics.innerWidth}`);
    assert.ok(metrics.hero, `hero image not loaded at ${width}px`);
    assert.ok(metrics.heading.width > 100 && metrics.heading.height > 75,
      `hero heading not laid out at ${width}px`);
    assert.ok(metrics.heading.top >= metrics.header.bottom - 2,
      `hero heading overlaps navigation at ${width}px`);

    const toggle = page.locator(".menu-toggle");
    if (width <= 760) {
      assert.ok(await toggle.isVisible(), `menu toggle hidden at ${width}px`);
      await toggle.click();
      assert.equal(await toggle.getAttribute("aria-expanded"), "true");
      assert.ok(await page.locator("#mobile-nav").isVisible());
      await page.keyboard.press("Escape");
      assert.equal(await toggle.getAttribute("aria-expanded"), "false");
      await page.locator(".mobile-nav").evaluate(el => el.inert === true)
        .then(inert => assert.ok(inert, "closed mobile menu should be inert"));
    } else {
      assert.ok(!(await toggle.isVisible()), `mobile toggle showing on desktop ${width}px`);
      assert.ok(await page.locator(".main-nav").isVisible());
    }
    await page.close();
    console.log(`PASS viewport ${width}px: layout, image, navigation`);
  }

  for (const route of ["/company/", "/work/"]) {
    const page = await browser.newPage({viewport:{width:390,height:820}, reducedMotion:"reduce"});
    const response = await page.goto(baseURL + route, {waitUntil:"domcontentloaded"});
    assert.equal(response.status(), 200);
    assert.ok((await page.locator("h1").count()) === 1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert.ok(overflow <= 1, `${route}: horizontal overflow on mobile by ${overflow}px`);
    await page.close();
    console.log(`PASS ${route} at 390px`);
  }
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
