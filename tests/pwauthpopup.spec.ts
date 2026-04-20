import{test,expect,Page} from "@playwright/test";

test("Authenticated popup", async ({browser})=>{

const context = await browser.newContext({httpCredentials:{username:'admin', password:'admin'}});
const page = await context.newPage();

// Approach 1: Pass login details along with url
// await page.goto("https://the-internet.herokuapp.com/basic_auth");
/* await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");

await page.waitForLoadState();

await expect(page.locator('text=Congratulations')).toBeVisible();

await page.waitForTimeout(5000); */

// Approach 2: Pass the login along with broswer context

await page.goto("https://the-internet.herokuapp.com/basic_auth");

await page.waitForLoadState();

await expect(page.locator('text=Congratulations')).toBeVisible();

await page.waitForTimeout(5000); 

})