import { test, expect } from "@playwright/test";

test.only("Calendar UI Controls", async ({ page }) => {

    const monthNumber = "8";
    const yearNumber = "2024";
    const date = "19";
    const expectedList = ["8", "19", "2024"];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(yearNumber).click();
    
    await page.locator(".react-calendar__tile").nth(monthNumber - 1).click();
    await page.getByText(date).click();

    const inputs = page.locator(".react-date-picker__inputGroup__input");
    

    for(let i = 0; i < await inputs.count(); i++) {
        const inputValue = await inputs.nth(i).inputValue();
        console.log(inputValue);
        expect(inputValue).toEqual(expectedList[i]);
    }   

    await page.pause();
});    