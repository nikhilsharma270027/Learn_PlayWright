import { test, expect } from "@playwright/test";
// Login UI -> jso
let webcontext;
const email = "anshika@gmail.com";
const password = "Iamking@000";

//  Test browser, cartorder, orderdetails, order history

test.beforeAll(async ({ browser }) => 
    {   
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill(email);
        await page.locator("#userPassword").fill(password);
        await page.locator("[value='Login']").click();
        await page.waitForLoadState("networkidle");
        await context.storageState({path: 'state.json'})
        // invoke browser by injecting storage state
        webcontext = await browser.newContext({storageState: 'state.json'})
});

test.only("Client App Login", async ({  }) => {
  const productName = "ZARA COAT 3";
  // new webcontext to avoid login again and again
  const page = await webcontext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");

  const products = page.locator(".card-body");
  // await page.goto("https://rahulshettyacademy.com/client");
  // await page.locator("#userEmail").fill(email);
  // await page.locator("#userPassword").fill(password);
  // await page.locator("[value='Login']").click();
  // await page.waitForLoadState("networkidle");
  // const titles = await page.locator(".card-body b").allTextContents();
  // console.log(titles);



  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  // await page.pause();

  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  console.log(bool);
  await expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  // await page.pause();

  await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  const verificationText = await page.locator(".user__name label").textContent();
  //   console.log(verificationText);
  // if (verificationText == email) {
  //   console.log("Email is correct");
  // } else {
  //   console.log("Email is incorrect");
  // }

  // console.log(await page.locator(".user__name label").textContent());
  expect(verificationText).toBe(email);

  await page.locator(".action__submit").click();
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  //  console.log(orderId);
  // console.log("done")

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


test.only("Test case 2", async ({  }) => {
  const productName = "ZARA COAT 3";
  // new webcontext to avoid login again and again
  const page = await webcontext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");

  const products = page.locator(".card-body");
 
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
})
