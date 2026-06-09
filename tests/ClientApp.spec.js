import { test, expect } from "@playwright/test";

test("Browser Playwright test", async ({ browser, page }) => {
  console.log("This is my first test");

  // await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
  // await page.locator("#userEmail").fill("anshika@gmail.com")
  // await page.locator("#userPassword").fill("Iamking@000")
  // await page.locator("[value='Login']").click();
  // await page.locator(".card-body").first().waitFor();
  // const titles = await page.locator(".card-body b").allTextContents();
  // console.log(titles);
});

test("UI Controls", async ({ page }) => {
  console.log("UI Controls");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  const userName = page.locator("#username");
  const documentLink = page.locator("[href*='documents-request']");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  // await page.pause()?
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  // assertions
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  await page.locator("#terms").click();
  console.log(await page.locator("#terms").last().isChecked());
  // uncheck
  // await page.locator("#terms").uncheck();
  // console.log(await page.locator("#terms").last().isChecked());

  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").last().isChecked()).toBeFalsy();

  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("child window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  const documentLink = page.locator("[href*='documents-request']");
  // await documentLink.click(); // new page is opened
  // wait for new tab
  // get context of new tab
  // const newpage = await context.waitForEvent("page"); // it is a promise, so we need to use await to get the value of newpage

  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // it is a promise, so we need to use await to get the value of newpage
    documentLink.click(), // new page is opened
  ]);
  // await newPage.locator(".red").waitFor();
  const text = await newPage.locator(".red").textContent();
  const splittedText = text.split("@")[1];
  const textcom = splittedText.split(" ")[0];
  console.log(textcom);
  await page.pause();
  await page.locator("#username").type(textcom);
  console.log(await page.locator("#username").inputValue());
});

// test.only('child window with url', async ({ browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://github.com/nikhilsharma270027")
//     const text = await page.locator(".p-name").textContent();
//     const splittedText = text.split("@")[1]
//     const textcom = splittedText.split(" ")[0]
//     console.log(textcom);
// });

test("Client App Login", async ({ page }) => {
  const email = "anshika@gmail.com";
  const password = "Iamking@000";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(password);
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
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
  for(let i = 0; i < optionCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if(text === " India") {
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
  for(let i = 0; i < rowCount; i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    console.log(rowOrderId);
    if(orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
    }
  }


  const orderIdDetails = await page.locator(".col-text").textContent();
  console.log(orderIdDetails);
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

  await page.pause();
});
