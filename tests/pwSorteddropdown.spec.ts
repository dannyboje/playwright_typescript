import {test, expect, Locator} from "@playwright/test";
// Text Input
// Radio buttons 
//CheckBoxes


test ('Verfify dropdown is sorted', async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");

   const dropDownOptions:Locator = page.locator('#animals>option');
   //const dropDownOptions:Locator = page.locator('#colors>option');
   // console.log(await dropDownOptions.allTextContents());

    const optionsText:string[] = (await dropDownOptions.allTextContents()).map(text=>text.trim());
    const originalList:string[]=[...optionsText];
    
    const sortedList:string[]=[...optionsText].sort();

    console.log("Original List:",originalList);
    console.log("Sorted List:",sortedList);

    expect(originalList).toEqual(sortedList);
    await page.waitForTimeout(2000);
});
