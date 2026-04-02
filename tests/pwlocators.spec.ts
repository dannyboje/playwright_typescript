/*

page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

*/

import {test, expect, Locator} from "@playwright/test"; 

test("Verify Playwright Locators", async({page})=>{

 await page.goto("https://demo.nopcommerce.com");

//    // page.getByAltText() to locate an element, usually image, by its text alternative.
   
//    const logo:Locator = page.getByAltText("nopCommerce demo store")
//    await expect(logo).toBeVisible();
//    // console.log("Title:",logo);
//    // const text:Locator = page.getByText("Welcome to our store");
//    // await expect(text).toBeVisible();

//    // await expect(page.getByText("Welcome to our store")).toBeVisible();
//    // await expect(page.getByText("Welcome to")).toBeVisible();
//    await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible();
   
//    // page.getByRole() to locate by explicit and implicit accessibility attributes.
//    await page.getByRole("link", { name: 'Register'}).click();
//    // await page.getByRole("checkbox", { name: 'Verify you are human'}).check();

//   // await expect(page.getByRole("heading", {name:'Register'})).toBeVisible();
//   await expect(page.getByLabel('First name:').fill("Yogi"));
//   await expect(page.getByLabel('Last name:').fill("Yogi"));
//   await expect(page.getByLabel('Email:').fill("abc@gmail.com"));

//   await expect(page.getByPlaceholder('Search store:').fill("Apple MacBook pro"));
// await page.goto("https://playwright.dev/docs/locators")

// await expect(page.getByTitle("Locate by title")).toHaveText("Locate");
// await expect(page.getByTitle("HyperText Markup Language")).toHaveText("Home");

//const link:Locator=page.getByTitle("Your Personal Details")
//expect(link).toHaveText("Your");

//await expect(page.getByTitle("News")).toHaveText("News");



})