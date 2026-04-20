import{test,expect,Page,chromium, firefox, webkit} from "@playwright/test";

//Browser ---> Context ----> Pages

//Broswe ---> Chromium, friefox, webkit

// Context ---> we can have multiple contexts for multiple users/apps for the same browser
                    // provide a way to iperate multiple independent browser sessions 

//Page ---> Tab/window/Popup

test("Broswe context demo", async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();

    // creating 2 pages
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    console.log("No of Pages created: ",context.pages().length)


    //await page.goto("https://testautomationpractice.blogspot.com/");
    // await page.waitForTimeout(2000);

await page1.goto("https://playwright.dev/");
await expect(page1).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");

await page2.goto("https://www.selenium.dev/");
    
await expect(page2).toHaveTitle("Selenium");
})