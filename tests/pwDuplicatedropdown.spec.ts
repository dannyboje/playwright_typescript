import {test, expect, Locator} from "@playwright/test";
// Text Input
// Radio buttons 
//CheckBoxes


test ('Verfify dropdown contain duplicates', async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");

   // const dropDownOptions:Locator = page.locator('#animals>option'); //  having duplicates
   const dropDownOptions:Locator = page.locator('#colors>option'); //not having duplicates

   const optionsText: string[]= (await dropDownOptions.allTextContents()).map(text=>text.trim());

   const myset = new Set<string>(); // Set - duplicates not allowed
   const duplicates:string[]=[]; // array - duplicates  allowed

   for(const text of optionsText)
   {
    if(myset.has(text))
    {
        duplicates.push(text);
    }
    else{
        myset.add(text);
    }
   }
   console.log("Duplicate options are:===>", duplicates);

   if(duplicates.length>0)
   {
     console.log("Duplicates options found")
   }
   else{
    console.log("Duplicates options not found")
   }
    await page.waitForTimeout(2000);
});
