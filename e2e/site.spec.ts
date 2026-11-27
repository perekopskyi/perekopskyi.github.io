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

test("marks the section in view as current in the navigation", async ({ page, isMobile }) => {
  test.skip(isMobile, "the desktop nav is always visible; the mobile menu reuses the same links");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Sections" });

  // The hero has no nav link, so nothing is current at the top of the page.
  await expect(nav.locator('[aria-current="true"]')).toHaveCount(0);

  for (const [id, label] of [
    ["about", "About"],
    ["experience", "Experience"],
    ["work", "Work"],
    ["skills", "Skills"],
    ["contact", "Contact"],
  ] as const) {
    await page.locator(`#${id}`).evaluate((section) => section.scrollIntoView({ block: "center" }));
    await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "true");
    await expect(nav.locator('[aria-current="true"]')).toHaveCount(1);
  }
});

test.describe("dark colour scheme", () => {
  test.use({ colorScheme: "dark" });

  test("follows the system setting", async ({ page }) => {
    await page.goto("/");
    const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(background).toBe("rgb(22, 20, 17)");
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
});

const lightPaper = "rgb(243, 240, 232)";
const darkPaper = "rgb(22, 20, 17)";

const bodyBackground = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test("theme toggle switches, persists across reloads, and can return to the system theme", async ({
  page,
}) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Dark theme" });
  expect(await bodyBackground(page)).toBe(lightPaper);
  await expect(toggle).toHaveAttribute("aria-pressed", "false");

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(await bodyBackground(page)).toBe(darkPaper);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  await expect(page.locator('meta[name="theme-color"]').first()).toHaveAttribute("content", "#161411");

  // The inline head script applies the stored choice before the app loads: no flash.
  await page.reload({ waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");
  expect(await bodyBackground(page)).toBe(darkPaper);

  // Switching back to the system theme clears the stored choice.
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  expect(await bodyBackground(page)).toBe(lightPaper);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBeUndefined();
});

test("theme toggle is reachable and operable from the keyboard", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard check runs on desktop");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Dark theme" });
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(await bodyBackground(page)).toBe(darkPaper);
});

test.describe("theme toggle with a dark system theme", () => {
  test.use({ colorScheme: "dark" });

  test("starts dark and switches to a stored light theme", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Dark theme" });
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(await bodyBackground(page)).toBe(lightPaper);
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
  });
});

test("hides the theme toggle without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("[data-theme-toggle]")).toBeHidden();
  await context.close();
});

for (const width of [360, 320]) {
  test(`never scrolls sideways at ${width}px`, async ({ page, isMobile }) => {
    test.skip(isMobile, "runs once, with an explicit viewport");
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
    await expect(page.locator("[data-theme-toggle]")).toBeInViewport({ ratio: 1 });
  });
}
