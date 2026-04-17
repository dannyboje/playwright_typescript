import { test, expect } from '@playwright/test';

test('Frames Demo', async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames/");

    // Total Number of frames present on the page

    const frames = page.frames();
    console.log("No of frames: ", frames.length);

  /*  //--- Approach 1: Using page.frame() ----

    const frame = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"});
    if (frame){
        await frame.locator("[name='mytext1']").fill("Hello");
        // await frame.fill("[name='mytext1']","Hello");
    }
    else{
        console.log("Frame is not available")
    }
await page.waitForTimeout(2000); */

// ----- Approach 2: Using frameLocator -----
 // ----- Approach 2: Using frameLocator -----

 const inputbox = page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']");
// const frame1Input = page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']");
 await inputbox.fill("John");
 console.log("Frame 1 filled using Approach 2");

})


test('Inner/child Frames Demo', async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame3 = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});
    
    if(frame3){
        await frame3.locator("[name='mytext3']").fill("Welcome");
        const childFrames = frame3.childFrames();
        console.log("CHild frames inside the frame 3: ",childFrames.length);
        const radio = childFrames[0].getByLabel("I am a human");
        await radio.check();
        await expect(radio).toBeChecked();
    }

else{
    console.log("Frame 3 is not found");
}
    

})


