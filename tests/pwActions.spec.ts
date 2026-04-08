import {test, expect, Locator} from "@playwright/test";
// Text Input
// Radio buttons 
//CheckBoxes


test ('Test Input Actions', async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const textBox: Locator=page.locator('#name');
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();

    const maxLength: string | null = await textBox.getAttribute("maxlength");
    expect(maxLength).toBe("15");

    await textBox.fill("Yogi Boje");
    const enteredValue: string = await textBox.inputValue();

    console.log ("Inpust Value Text contest of Firstname :", enteredValue);
    expect(enteredValue).toBe("Yogi Boje");

    await page.waitForTimeout(1000);
    

});

test ('Radio Button Actions', async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const maleRadio: Locator = page.locator('#male')
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();

    expect(await maleRadio.isChecked()).toBe(false);
    await maleRadio.check();
    await expect (maleRadio).toBeChecked();

    await page.waitForTimeout(1000);

});

test.only ('Checkboxes Actions', async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");
    
   //1. Select a specific Checkbox (Sunday)
    const sundayCheckbox : Locator =page.getByLabel('Sunday');
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked();

    //2. Select all Checkboxes and asser each is checked
    const days:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const checkboxes:Locator[] = days.map(index =>page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

 for(const checkbox of checkboxes){
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
 
// 4. Unchec last 3 checkboxes and assert   

  for(const checkbox of checkboxes.slice(-3)){
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(1000);


    //5. Toggle Checkboxes: If CHecked, Uncheck; if unchecked, Check. Assert Sate flipped.

    for(const checkbox of checkboxes){
        if (await checkbox.isChecked())
        {
            //only if checked  
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
      else{
            //only if not checked 
            await checkbox.check();
            await expect(checkbox).toBeChecked();
      }

    } 
    await page.waitForTimeout(5000);

    // 6. Randomely select checkboxes 
    const indexes = [1,3,6];
    for (const i of indexes)
    {
        await checkboxes[i].check();
        await expect(checkboxes[i]).toBeChecked();
        
    }
    await page.waitForTimeout(2000);


    //7. select the checkbox based on the Label
    const weekname:string="Friday";

    for(const label of days)
    {
        if (label.toLowerCase() === weekname.toLowerCase())
        {
            const checkbox= page.getByLabel(label);
            checkbox.check();
                await expect(checkbox).toBeChecked();

    }

}

});

