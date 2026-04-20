import{test,expect,Page,chromium, firefox, webkit} from "@playwright/test";

test("Handle tabs", async ()=>{

    const browser = await chromium.launch();
    const context = await browser.newContext();

    // creating 2 pages
    const parentPage = await context.newPage();
   //  const page2 = await context.newPage();

   await parentPage.goto("https://testautomationpractice.blogspot.com/")
    
   //2 two statement should go parallely 
    // context.waitForEvent('page');
    // parentPage.locator("button:has-text('New Tab')").click();
   
    const [childPage] = await Promise.all([context.waitForEvent('page'),parentPage.locator("button:has-text('New Tab')").click()]);

   // Appraoch 1: switch between pages and get titiles 
   const pages = context.pages();
   console.log("No of Pages created: ",pages.length)

   console.log("Title of the Parent page:",await pages[0].title());
   console.log("Title of the Child page:",await pages[1].title());

   console.log("-----------------------------------------------------");
   
   // Appraoch 2: Alternate
   
   console.log("Title of the Parent page:",await parentPage.title());
   console.log("Title of the Child page:",await childPage.title());
    
} )