import{test,expect,Page} from "@playwright/test";

test("Autowaiting and forcing", async ({page})=>{

   
    await page.goto("https://demowebshop.tricentis.com/");

 /*    // 1. Hard Assertions
    await expect(page).toHaveTitle('Demo Web Shop2');
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    
    const logo = await page.locator("img[alt='Tricentis Demo Web Shop']");
    expect(logo).toBeVisible(); */
  
    // 2. Soft Assertions - the tests executes other tests even when one of the assertion fails

     await expect.soft(page).toHaveTitle('Demo Web Shop');
      await expect.soft (page).toHaveURL('https://demowebshop.tricentis.com/');
      
      const logo = await page.locator("img[alt='Tricentis Demo Web Shop']");
      await expect.soft (logo).toBeVisible();
    

    await page.waitForTimeout(5000);

})
   