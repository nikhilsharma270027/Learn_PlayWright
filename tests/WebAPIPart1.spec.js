import { test, expect, request } from "@playwright/test";
import APIUtils from "./utils/APIUtils";

const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
let token;
let orderId;

let response ;
// beforeAll and beforeEach hooks are used to set up the test environment before running the tests.
// The beforeAll hook runs once before all tests in the file,
test.beforeAll(async () => {
  // Login API call to get the auth token
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  console.log("API Utils:", apiUtils);
  response = await apiUtils.createOrder(orderPayload);
  console.log("Response BeforeAll:", response);
}, );


// beforeEach hook runs before each individual test.
test.beforeEach(() => {});

test.only("Client App login", async ({ page }) => {
  // ApiUtils class to handle API calls
  // const apiUtils = new ApiUtils(apiContext, loginPayload);
  // const orderId = await apiUtils.createOrder(token);
  await page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");

  //   await page.locator("#userEmail").fill("anshika@gmail.com")
  //   await page.locator("#userPassword").fill("Iamking@000")
  //   await page.locator("[value='Login']").click();

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  const rowCount = await rows.count();

  // interview question important
  for (let i = 0; i < rowCount; i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    // console.log(rowOrderId);
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  // console.log(orderIdDetails);
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
  await page.pause();
});
