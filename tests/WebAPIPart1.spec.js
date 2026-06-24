import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";

const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
let token;
let orderId;
// beforeAll and beforeEach hooks are used to set up the test environment before running the tests.
// The beforeAll hook runs once before all tests in the file,
test.beforeAll(async () => {
  // Login API call to get the auth token
  const apiContext = await request.newContext();
  // const response = await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login", {
  //   data: loginPayload,
  // });
  // // console.log("Response", response);

  // // expect(response.status()).toBe(200);
  // expect(response.ok()).toBeTruthy();

  // const responseJson = await response.json();
  // // console.log(responseJson);
  // const authToken = responseJson.token;
  // token = authToken;
  // console.log(token);

  // APIUtils class to handle API calls
  // const apiUtils =

  // Order Api call to get the order details
  const orderResponse = await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/order/create-order", {
    data: orderPayload,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  const orderResponseJson = await orderResponse.json();
  orderId = orderResponseJson.orders[0];
  console.log("Order ID:", orderId);
});

// beforeEach hook runs before each individual test.
test.beforeEach(() => {});

test.only("Client App login", async ({ page }) => {
  // ApiUtils class to handle API calls
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  const orderId = await apiUtils;
  await page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, token);

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
    console.log(rowOrderId);
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  console.log(orderIdDetails);
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
  await page.pause();
});
