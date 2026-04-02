import {test, expect} from "@playwright/test"; 

/* test("title", ()=>{


}) */

test ("Verify Page title",async ({page})=>{

    await page.goto("https://automationstepbystep.com/")

    let title:string= await page.title();
      console.log("Title:",title);

     await expect(page).toHaveTitle("NEVER STOP LEARNING - Automation Step by Step");
     await expect(page).toHaveURL(/automationstepbystep/);
})