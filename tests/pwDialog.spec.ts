import { test, expect } from '@playwright/test';

test('Simple Dialog', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', (dialog) => {
        console.log("DIalog type is:", dialog.type()) // return type of the dialog
        expect(dialog.type()).toContain('alert');
        
        console.log("DIalog Text:", dialog.message()) // returns message from dialog
        expect(dialog.message()).toContain('I am an alert box!');
        dialog.accept()});

    await page.locator("#alertBtn").click();
    await page.waitForTimeout(2000);

})

test ('Confirmation Dialog', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', (dialog) => {
        console.log("Dialog type is:", dialog.type()) // return type of the dialog
        expect(dialog.type()).toContain('confirm');
        
        console.log("Dialog Text:", dialog.message()) // returns message from dialog
        expect(dialog.message()).toContain('Press a button!');
       dialog.accept(); //close a dialog by accepting
       // dialog.dismiss(); //close a dialog by cancelling 
    });

    await page.locator("#confirmBtn").click();
    const text:string = await page.locator("#demo").innerText();
    console.log("Output text: ", text);
    // expect(page.locator("#demo")).toHaveText("You pressed Cancel!");
    expect(page.locator("#demo")).toHaveText("You pressed OK!")
    await page.waitForTimeout(2000);

})

test ('Prompt Dialog', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', (dialog) => {
        console.log("Dialog type is:", dialog.type()) // return type of the dialog
        expect(dialog.type()).toContain('prompt');
        
        console.log("Dialog Text:", dialog.message()) // returns message from dialog
        expect(dialog.message()).toContain('Please enter your name:');

        expect(dialog.defaultValue()).toContain("Harry Potter"); // Checks default value of the dialog

       dialog.accept('Yogi'); //close a dialog by accepting
       // dialog.dismiss(); //close a dialog by cancelling 
    });

    await page.locator("#promptBtn").click();

    const text:string = await page.locator("#demo").innerText();
    console.log("Output text: ", text);
    // expect(page.locator("#demo")).toHaveText("You pressed Cancel!");
    expect(page.locator("#demo")).toHaveText("Hello Yogi! How are you today?")
    await page.waitForTimeout(2000);

})
