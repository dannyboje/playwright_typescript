import { test, expect } from "@playwright/test";

test.beforeEach('Launching App', async ({page}) => {
    
    await page.goto("https://demowebshop.tricentis.com/");
})

test('Logo Test',async ({page}) => {
    
    await expect(page.locator("img[alt='Tricentis Demo Web Shop']")).toBeVisible();
    
});

test('Title Test',async ({page}) => {
    expect(await page.title()).toContain("Demo Web Shop");
    
});

test('Search test', async ({page}) => {
    await page.locator('#small-searchterms').fill("Laptop",{force:true});
    await page.locator("input[value='Search']").click();
    await expect.soft(page.locator('h2 a').nth(0)).toContainText("laptop", {ignoreCase:true});
}) 