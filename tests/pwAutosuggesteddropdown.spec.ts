import {test, expect, Locator} from "@playwright/test";

test ('Autosuggested dropdown', async ({page})=> {
    
    await  page.goto("https://www.flipkart.com/");

    await page.waitForTimeout(2000);
    let closeButton:Locator = page.locator('//span[@role="button"]');
    if (await closeButton.isVisible())
     {
      await page.keyboard.press('Escape');
      // await closeButton.click();
    }

    // Fill the visible search input and search
    await page.locator("input[name='q']:visible").fill("smart");
    await page.waitForTimeout(5000);

    // Get all the suggested options --> Ctrl+Shift+P on DOM --> Emulate focused page 

    const options:Locator = page.locator("ul>li");
    const count = await options.count();

    console.log("Number of suggested options:", count);

    // printing all the suggested options in the console
    for (let i = 0; i < count; i++) {
        const text: string = await options.nth(i).innerText();
        if (text === 'smartphone'){
            options.nth(i).click();
            await page.waitForTimeout(5000);
            break
        }
        console.log(`Option ${i + 1}: ${text}`);
    }

});