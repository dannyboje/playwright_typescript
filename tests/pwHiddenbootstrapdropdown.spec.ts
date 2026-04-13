import {test, expect, Locator} from "@playwright/test";

test ('Bootstrap hidden dropdown', async ({page})=> {

    await  page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();

    //click on the PIM

    await page.getByText('PIM').click();
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(3000);

//capture all the options from dropdown
    const options:Locator =page.locator("div[role='listbox'] span");
    const count:number = await options.count();
    console.log("Number of options in a dropdown:", count);

    console.log("All the text contents array:", await options.allTextContents());

    // printing all the suggested options in the console
    for (let i = 0; i < count; i++) {
        const text: string = await options.nth(i).innerText();
       /* if (text === 'smartphone'){
            options.nth(i).click();
            await page.waitForTimeout(5000);
            break
        } */
        console.log(`Option ${i + 1}: ${text}`);
    }

    //select or click on a option
    for (let i = 0; i < count; i++) {
        const text: string = await options.nth(i).innerText();
       if (text === 'Automation Tester'){
            options.nth(i).click();
            await page.waitForTimeout(5000);
            break
        } 
        
    }

});