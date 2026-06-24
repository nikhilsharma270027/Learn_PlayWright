import { test, expect } from "@playwright/test";

test("Popup Validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //   await page.click("https:/google.com");
  //   await page.goBack(); // to go back to the previous page
  //   await page.forward(); // to go forward to the next page
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  // await expect(page.locator("#displayed-text")).not.toBeVisible();
  // await page.pause();

  page.on("dialog", (dialog) => {
    console.log(dialog.message());
    dialog.accept();
  });

  await page.locator("#confirmbtn").click();

  await page.locator("#mousehover").hover();

  // iFrame
  const framepage = page.frameLocator("#courses-iframe");
  // :visible is used to click on the element which is visible on the page
  await framepage.locator("li a[href*='lifetime-access']:visible").click();

  const testCheck = await framepage.locator(".text h2 span").textContent();
  console.log(testCheck);

  await page.pause();
});
