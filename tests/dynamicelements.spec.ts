import {test, expect, Locator} from "@playwright/test";
// using XPath
test ('Handle Dynamic Elements using Xpath', async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");

    for(let i=1; i<=5; i++) {

        let button:Locator = page.locator('//button[text() = "STOP" or text()= "START"]');
    await button.click();

    await page.waitForTimeout(2000);
    }

});


//Using css
test ('Handle Dynamic Elements using css locator', async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");

    for(let i=1; i<=5; i++) {

        
        const button =  page.locator('button[name="start"],button[name="stop"]');
    
        await button.click();

    await page.waitForTimeout(2000);
    }
});
    // Using PW specific Locators 

test ('Handle Dynamic Elements using PW locator', async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");

    for(let i=1; i<=5; i++) {

        
        const button =  page.getByRole('button', {name: /START|STOP/});
    
        await button.click();

    await page.waitForTimeout(2000);
    }

});

