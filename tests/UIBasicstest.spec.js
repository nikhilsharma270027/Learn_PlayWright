import { test, expect } from "@playwright/test";

// test("First test", async ({ browser }) => {
//   console.log("This is my first test");
// //    playwright code-
// // step1- open the browser
// // step2- open the page
// // step3- do some actions
// });

// Fixtures- browser, page, context, request, response, baseURL, trace, video, screenshot,
// what is fixtures? - It is a predefined set of objects that are automatically created and passed to the test functions.
// browser- it is a fixture that provides an instance of the browser that can be used to create new pages and contexts.
// page- it is a fixture that provides an instance of the page that can be used to interact with the web page.
// context- it is a fixture that provides an instance of the browser context that can be used to create new pages and manage cookies and other browser settings.

// test("Browser Playwright test", async ({ browser, }) => {
//   console.log("This is my first test");
//   //    playwright code-
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto("https://www.google.com/");
// });

test.only("@Page Playwright test", async ({ page }) => {
  console.log("This is my first test");
  // chrome - plugins/ cookies

  // const context = await browser.newContext();
  // const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  const title = await page.title();
  console.log(title);
  await page.locator("#username").fill("rahulshettyacademy");
//   // await page.locator("#").fill("Learning@830$3mK2");
//   // await page.locator("#signInBtn").click();
//   // console.log(await page.locator("[style*='block']").textContent());
//   // await expect(page.locator("[style*='block']")).toContainText("Incorrect");
//   // // type -> fill
//   // await page.locator("#username").fill("")
  
//   await page.locator("#username").type("rahulshetty")
  await page.locator("#password").type("Learning@830$3mK2")
  await page.pause()
  const signInBtn = page.locator("#signInBtn")
  await page.locator("#signInBtn").click()
//   await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.")
  console.log("done")
  // // type -> fill
  await page.locator("#username").fill("")
  await page.locator("#username").fill("rahulshettyacademy")
  await signInBtn.click();
  
  // console.log(await page.locator(".card-body a").first().textContent());
  // console.log(await page.locator(".card-body a").nth(1).textContent());
  const allTitles = await page.locator(".card-body a").allTextContents(); // it is not synchronous, it is a promise, so we need to use await to get the value of allTitles
  console.log(allTitles);




  

  
  
});
