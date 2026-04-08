import {test, expect, Locator} from "@playwright/test";
// Text Input
// Radio buttons 
//CheckBoxes


test ('Single Select Drop Down', async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // 1) select option from the drop down (4 ways)

    await page.locator ('#country').selectOption('India'); // visible text
    // await page.locator ('#country').selectOption({value:'uk'}); // by using value attribute
    // await page.locator ('#country').selectOption({label:'India'}); //by using label
    // await page.locator ('#country').selectOption({index:3}); //by usoing index  

    // 2. Check number of options in the dropdown(count)
    const dropDownOptions:Locator = page.locator ('#country>option');
    await expect(dropDownOptions).toHaveCount(10);

    //3. check an option is present in the dropdown

    const optionsText:string[] = (await dropDownOptions.allTextContents()).map(text=>text.trim());
    console.log(optionsText)

    expect(optionsText).toContain('Japan');

    //4) printing options from the drop down
    for(const option of optionsText)
    {
        console.log(option)
    }
    
    await page.waitForTimeout(2000);
});
