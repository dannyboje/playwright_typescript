import { test, expect, Locator, Page } from "@playwright/test";

async function selectDate(targetYear:string,targetMonth:string,targetDay:string,page:Page, isFuture:boolean)
{
    while (true) {

        const currentMonth = await page.locator('.ui-datepicker-month').textContent();
        const currentYear  = await page.locator('.ui-datepicker-year').textContent();

        //console.log(`Current: ${currentMonth?.trim()} ${currentYear?.trim()}`);

        if (currentMonth?.trim() === targetMonth && currentYear?.trim() === targetYear) {
            console.log(`Reached target: ${targetMonth} ${targetYear}`);
            break;
        }

     if(isFuture){
        await page.locator('.ui-datepicker-next').click();
     }
       else{
        await page.locator('.ui-datepicker-prev').click();
       } 
        
    }

       /* // Click next using JS to prevent calendar from closing
        await page.evaluate(() => {
            const nextBtn = document.querySelector('.ui-datepicker-next') as HTMLElement;
            nextBtn?.click();
        });

        // Wait for month to actually change before looping
        await page.waitForFunction((prev) => {
            const month = document.querySelector('.ui-datepicker-month');
            return month?.textContent?.trim() !== prev;
        }, currentMonth?.trim());
    }
*/
    // Click the target day
    await page.locator('.ui-datepicker-calendar td a').filter({ hasText: new RegExp(`^${targetDay}$`) }).click();

    // Verify the date was set correctly in the input
    const selectedDate = await page.locator('#datepicker').inputValue();
    console.log(`Selected date: ${selectedDate}`);
    expect(selectedDate).toBe(`09/17/2025`);
}

test('JQuery datepicker', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    // Dismiss cookie banner if present
    const cookieBanner: Locator = page.locator('#cookieChoiceDismiss');
    if (await cookieBanner.isVisible()) {
        await cookieBanner.click();
    }

    // Open the datepicker
   await page.locator('#datepicker').scrollIntoViewIfNeeded();
   await page.locator('#datepicker').click();
   await page.waitForSelector('.ui-datepicker', { state: 'visible' });

   const dateInput = page.locator('#datepicker');

   

    // Target date
    const targetYear  = "2025";
    const targetMonth = "September";
    const targetDay   = "17";
    await selectDate(targetYear,targetMonth,targetDay,page,false);

    const expectedDate = ("09/17/2025");
    await expect(dateInput).toHaveValue(expectedDate);

});