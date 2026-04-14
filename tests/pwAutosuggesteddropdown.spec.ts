import {test, expect, Locator} from "@playwright/test";

test ('Autosuggested dropdown', async ({page})=> {

    // Mask webdriver property to avoid bot detection
    await page.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });

    // Spoof real browser headers
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    });

    await page.goto("https://www.flipkart.com/", {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    await page.waitForSelector("input[name='q']", { timeout: 30000 });
    await page.waitForTimeout(5000);
    await page.keyboard.press('Escape');

    // Fill the visible search input and search
    await page.locator("input[name='q']:visible").fill("smart");
    await page.waitForSelector("ul>li", { timeout: 30000 });
    await page.waitForTimeout(5000);

    // Get all the suggested options --> Ctrl+Shift+P on DOM --> Emulate focused page 
    const options:Locator = page.locator("ul>li");
    const count = await options.count();

    console.log("Number of suggested options:", count);

    // printing all the suggested options in the console
    for (let i = 0; i < count; i++) {
        const text: string = await options.nth(i).innerText();
        if (text === 'smartphone'){
            await options.nth(i).click();
            await page.waitForTimeout(5000);
            break;
        }
        console.log(`Option ${i + 1}: ${text}`);
    }

});