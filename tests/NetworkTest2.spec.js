import { test, expect } from "@playwright/test";

test("@QW Security test request interception", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page.locator("button[routerlink*='myorders']").click();

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", async (route) => {
    route.continue({
      url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=620c7bf148767f1f1215d2cb",
    });
  });

  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
  await page.pause();
});

// The page.route() method in Playwright allows you to intercept, modify, mock, or abort network traffic directly within your test script.
//
// It provides deep control over external HTTP/HTTPS API endpoints without relying on external proxy tools.
// Key Core Actions

// Every time Playwright intercepts a request that matches your specified URL pattern, you must resolve it using one of three primary actions:
// route.fulfill() – Provides a mock response immediately, preventing the request from hitting the live network.

// route.continue() – Allows the request to proceed to the destination server, optionally with modified headers, methods, or payloads.

//  route.abort() – Cancels the network request entirely, which is highly useful for blocking heavy resources like images or tracking scripts.
