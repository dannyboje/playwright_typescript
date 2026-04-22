import{test,expect,Page} from "@playwright/test";

test("Autowaiting and forcing", async ({page})=>{

    test.setTimeout(50000); //50 secs
    // test.slow();
    
    // Assertion - Auto wait works
    await page.goto("https://demowebshop.tricentis.com/", {timeout:10000});
    await expect(page.locator('text=Welcome to our store')).toBeVisible({timeout:10000});

    // Actions - Auto wait works
    await page.locator('#small-searchterms').fill("Laptop",{force:true}); //search box - Force action
    await page.locator('.button-1.search-box-button').click({force:true}); //clicking on search button - Force action




})