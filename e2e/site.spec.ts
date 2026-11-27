import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { cvLinked, cvPath } from "../src/data/cv.ts";
import { site } from "../src/data/site.ts";

/** Finishes scroll-reveal animations so assertions see the final state. */
async function showAllContent(page: Page) {
  await page.addStyleTag({
    content: "[data-reveal]{opacity:1!important;transform:none!important}",
  });
}

test("serves prerendered content that reads without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Yevhenii Perekopskyi");
  await expect(page.getByRole("heading", { name: "Selected work" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tournament Bracket Builder" })).toBeVisible();

  // The noscript style must defeat the reveal animation's initial opacity.
  const opacity = await page
    .locator("[data-reveal]")
    .first()
    .evaluate((element) => getComputedStyle(element).opacity);
  expect(opacity).toBe("1");

  await context.close();
});

test("hydrates without errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  expect(errors).toEqual([]);
});

test("has meta tags and structured data from site data", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Yevhenii Perekopskyi — Senior Full-stack Engineer");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://perekopskyi.github.io/og.png",
  );

  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
  const data = JSON.parse(jsonLd ?? "{}");
  expect(data.mainEntity.name).toBe("Yevhenii Perekopskyi");
  expect(data.mainEntity.jobTitle).toBe("Senior Full-stack Engineer");
});

test("section links move to their section", async ({ page, isMobile }) => {
  await page.goto("/");

  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click();
  }
  await page.getByRole("navigation", { name: "Sections" }).getByRole("link", { name: "Work" }).click();

  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
});

test("mobile menu opens, closes on Escape, and the page never scrolls sideways", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Sections" });
  await expect(nav).toBeHidden();

  await page.getByRole("button", { name: "Menu" }).click();
  await expect(nav).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBe(0);
});

test("has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  await showAllContent(page);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  expect(serious.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
});

test("serves the CV as a PDF and links to it only once experience is published", async ({
  page,
  request,
}) => {
  const response = await request.get(cvPath);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  const pdf = await response.body();
  expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
  // Contacts and URLs are plain text: no clickable link annotations.
  expect(pdf.toString("latin1")).not.toMatch(/\/Subtype\s*\/Link|\/URI/);

  await page.goto("/");
  const heroLink = page.getByRole("link", { name: "Download CV (PDF)" });
  if (cvLinked()) {
    await expect(heroLink).toHaveAttribute("href", cvPath);
    await expect(heroLink).toHaveAttribute("download", "");
  } else {
    await expect(heroLink).toHaveCount(0);
  }
});

test("lists employment history before selected work", async ({ page }) => {
  await page.goto("/");

  const experience = page.locator("#experience");
  await expect(experience.getByRole("heading", { name: "LOW6" })).toBeAttached();
  await expect(experience.getByRole("heading", { name: "ArtMyWeb" })).toBeAttached();

  const order = await page.evaluate(() =>
    [...document.querySelectorAll("main > section[id]")].map((section) => section.id),
  );
  expect(order.indexOf("experience")).toBeLessThan(order.indexOf("work"));
});

test("serves a generated sitemap with the canonical URL and a content-based lastmod", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);

  const xml = await response.text();
  expect(xml).toContain(`<loc>${site.url}</loc>`);
  expect(xml).not.toContain("<changefreq>");
  expect(xml).not.toContain("<priority>");

  // lastmod is omitted only without git history; when present it is a real date, not in the future.
  const lastmod = xml.match(/<lastmod>(.+)<\/lastmod>/)?.[1];
  if (lastmod) {
    expect(lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Date.parse(lastmod)).toBeLessThanOrEqual(Date.now());
  }
});
