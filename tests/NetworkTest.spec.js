import { test, expect, request } from "@playwright/test";
import APIUtils from "./utils/APIUtils";

const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
let token;
let orderId;

//
const fakePayloadOrders = { data: [], message: "No Orders" };

let response;
// beforeAll and beforeEach hooks are used to set up the test environment before running the tests.
// The beforeAll hook runs once before all tests in the file,
test.beforeAll(async () => {
  // Login API call to get the auth token
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  // console.log("API Utils:", apiUtils);
  response = await apiUtils.createOrder(orderPayload);
  // console.log("Response BeforeAll:", response);
});

// beforeEach hook runs before each individual test.
test.beforeEach(() => {});

test("Client App login", async ({ page }) => {
  // ApiUtils class to handle API calls
  // const apiUtils = new ApiUtils(apiContext, loginPayload);
  // const orderId = await apiUtils.createOrder(token);
  await page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");

  // page.route is used to intercept network requests made by the page.
  // In this case, we are intercepting the POST request to the /graphql endpoint and
  // providing a mock response.
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca", 
    async (route) => {
      // life cycle of the request is controlled by the route object, and we can fulfill the request with a custom response.
      // intercepting response -> API request _> browser -> render data on frontend
      // intercepting response -> API request _> |||hijack|||  browser -> render data on frontend
      // intercepting response -> API request _> {fake response to } ->  browser -> render data on frontend


    const respomse = await page.request.fetch(route.request());
    // travel of response to brwoser is done by the route.fulfill method, which takes the response from the API and sends it to the browser.
    let body = JSON.stringify(fakePayloadOrders); //  fakePayloadOrders;

    route.fulfill({
      response: respomse,
      body: body
    });

  });

  await page.pause();
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");

  //   await page.locator("#userEmail").fill("anshika@gmail.com")
  //   await page.locator("#userPassword").fill("Iamking@000")
  //   await page.locator("[value='Login']").click();

  await page.locator("button[routerlink*='myorders']").click();
  // await page.locator("tbody").waitFor();
  // const rows = await page.locator("tbody tr");

  await page.pause();
});

// here what we do is API testing on the orders page
// auer can have multiple orders and we want to verify that the order we created via API is present in the UI as well.
// and all the user who hasnt placed any order and must show "No Orders" message on the orders page.

// so to smartly handle this
// by pushin a fake json object into the orders array in the orderPayload and then we can verify that the order is present in the UI as well.
// example json object to push into the orders array in the orderPayload
// {
//   "data": [],
//   "message": "No Orders"
// }
