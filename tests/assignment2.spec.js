import { test, expect } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const USER_EMAIL = "test27@gmail.com";
const USER_PASSWORD = "Nikhil27damn@";

// ── Helpers ────────────────────────────────────────────────────────────────────
async function loginAndGoToBooking(page) {
  await page.goto(`${BASE_URL}/login`);

  // Located by placeholder
  await page.getByPlaceholder("you@email.com").fill(USER_EMAIL);

  // Located by label
  await page.getByLabel("Password").fill(USER_PASSWORD);

  // Located by id
  await page.locator("#login-btn").click();

  await expect(page.getByRole("link", { name: "Browse Events →" })).toBeVisible();
}

test("Assignment 2", async ({ page }) => {
  // ── Step 1: Log in ───────────────────────────────────────────────────────
  await loginAndGoToBooking(page);

  await page.goto(`${BASE_URL}/events`);
  await page.getByTestId("event-card").first().getByTestId("book-now-btn").click();

  await page.getByLabel("Full Name").fill("Test User");
  await page.locator("#customer-email").fill("test1@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("9999999999");
  await page.locator(".confirm-booking-btn").click();

  await page.getByRole("link" , {name: 'View My Bookings'}).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole("link", { name: "View Details" }).first().click();
 await expect(page.getByText('Booking Information')).toBeVisible();

  // Validate booking ref first letter matches event name first letter
  const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  const eventtitle = await page.locator("h1").innerText();
  expect(bookingRef.trim().charAt(0)).toBe(eventtitle.trim().charAt(0));
  console.log("Booking Reference:", bookingRef, "Event Title:", eventtitle);

  await page.locator('#check-refund-btn').click();

 // Spinner must appeat immediately
 await expect(page.locator("#refund-spinner")).toBeVisible();  

 // Wait for spinner to disappear after 4s 
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 5000 });

  // Validate eligible message
 // Validate eligible message
  const resultMessage = page.locator('#refund-result');
  await expect(resultMessage).toBeVisible();
  await expect(resultMessage).toContainText('Eligible for refund');
  await expect(resultMessage).toContainText('Single-ticket bookings qualify for a full refund');

});


test.only('refund not eligible for group ticket booking', async ({ page }) => {
  await loginAndGoToBooking(page);
  await page.goto(`${BASE_URL}/events`);
  await page.getByTestId("event-card").last().getByTestId("book-now-btn").click();

  // increase ticket quantity to 3 for group booking its a;ready one
   await page.locator('button:has-text("+")').click();
  await page.locator('button:has-text("+")').click();


  await page.getByLabel("Full Name").fill("Test User");
  await page.locator("#customer-email").fill("test1@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("9999999999");
  await page.locator(".confirm-booking-btn").click();

  await page.getByRole("link" , {name: 'View My Bookings'}).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole("link", { name: "View Details" }).first().click();
 await expect(page.getByText('Booking Information')).toBeVisible();

  // Validate booking ref first letter matches event name first letter
  const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  const eventtitle = await page.locator("h1").innerText();
  expect(bookingRef.trim().charAt(0)).toBe(eventtitle.trim().charAt(0));
  console.log("Booking Reference:", bookingRef, "Event Title:", eventtitle);

  await page.locator('#check-refund-btn').click();

 // Spinner must appeat immediately
 await expect(page.locator("#refund-spinner")).toBeVisible();  

 // Wait for spinner to disappear after 4s 
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 5000 });

  // Validate eligible message
 // Validate eligible message
  const resultMessage = page.locator('#refund-result');
  await expect(resultMessage).toBeVisible();
  await expect(resultMessage).toContainText('Not eligible for refund. Group bookings (3 tickets) are non-refundable.');
  await expect(resultMessage).toContainText('Not eligible for refund. Group bookings (3 tickets) are non-refundable.');
});
