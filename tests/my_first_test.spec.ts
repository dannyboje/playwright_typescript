import {test,expect} from '@playwright/test';

test('my first test',async ({page})=>{

    await page.goto('https://google.com');
    // Handle popup (lile Accpet cookies)
    const AccpetButton = page.locator('button:has-text("Accept all")');
    if (await AccpetButton.isVisible()){
        console.log("Accept button is visible");
        await AccpetButton.click();
        console
    }
    
    await page.locator('textarea[name="q"]').fill('playwright');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    const results = await page.locator('h3').allTextContents();
    expect(results.length).toEqual(0);
})