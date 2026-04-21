import{test,expect,Page} from "@playwright/test";

test("Playwright Assertions Demo", async ({page})=>{

   
    
    //1. Auto-retrying Assertion - automatically retirs until it passes or times out
    await page.goto("https://demowebshop.tricentis.com/");

    // Auto-retry: waits foer the element to be visible and have the expected text
    await expect(page.locator('text=Welcome to our store')).toBeVisible();
    await expect(page.locator("div[class='product-grid home-page-product-grid'] strong")).toHaveText('Featured products');

    // 2. Non-retrying assertions (executes immidiately, no retry)
    const title = await page.title();
    expect(title.includes('Demo Web Shop')).toBeTruthy();  // no auto-retry

    const welcomeText = await page.locator('text=Welcome to our store').textContent();
    expect(welcomeText).toContain('Welcome'); //non-retrying

    //3. Negating Matcher
    await expect(page.locator('text=Do not to our store')).not.toBeVisible();
    expect(welcomeText).not.toContain('Do not'); //non-retrying

    await page.waitForTimeout(5000);

    //3. 
   



})