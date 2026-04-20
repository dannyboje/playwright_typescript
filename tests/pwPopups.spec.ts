import{test,expect,Page} from "@playwright/test";

test("Handle popups", async ({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://testautomationpractice.blogspot.com/");

//Multiple Popups
await Promise.all([page.waitForEvent('popup'),page.locator("#PopUp").click()]);
await page.waitForTimeout(2000);

const allPopupWindows = context.pages();

console.log("Number of pages/windows:", allPopupWindows.length);

console.log(allPopupWindows[0].url());
console.log(allPopupWindows[1].url());
console.log(allPopupWindows[2].url());

for (const pw of allPopupWindows)
{
const title = await pw.title();
if (title.includes('Playwright')){
            await pw.locator('.getStarted_Sjon').click();
            await page.waitForTimeout(5000);
            // Perform any other actions...
            await pw.close();
    }
}
await page.waitForTimeout(5000);
})