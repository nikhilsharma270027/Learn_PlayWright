import { test, expect } from "@playwright/test";

test("Playwright Special locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice");
  //   GetBylabel locator will search for the label text and then find the input
  // field associated with it and fill the value in it
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");


//   getByPlaceholder will search for the input field with the placeholder text and fill the value in it
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.waitForLoadState("networkidle");
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();

  await page.pause();
});


// getbylabel onl works when
// 1. The label element has a for attribute that matches the id of the input field
// 2. The label element is a parent of the input field