import {test, expect, Locator} from "@playwright/test";
// Text Input
// Radio buttons 
//CheckBoxes


test ('Multi Select Drop Down', async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // 1) select option from the drop down (4 ways)
    // await page.locator('#colors').selectOption(['Red','Blue','Green']); // using visible text
    // await page.locator('#colors').selectOption(['red','green','white']); // using visible text
    // await page.locator('#colors').selectOption([{label:'Red'},{label:'Green'}]); //using label
    await page.locator('#colors').selectOption([{index:0},{index:1},{index:2}]); //using label

    // 2. Check number of options in the dropdown(count)
    const dropDownOptions:Locator = page.locator ('#colors>option');
    await expect(dropDownOptions).toHaveCount(7);
    
    //3. check an option is present in the dropdown
    const optionsText:string[] = (await dropDownOptions.allTextContents()).map(text=>text.trim());
    console.log(optionsText)
    expect(optionsText).toContain('Green');
    
    //4) printing options from the drop down
    for(const option of optionsText)
    {
        console.log(option)
    }
    await page.waitForTimeout(2000);
});
