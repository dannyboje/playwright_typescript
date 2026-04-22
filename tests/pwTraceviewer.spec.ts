import{test,expect} from "@playwright/test";
test ('Tracing Test', async ({page,context})=>{

   // context.tracing.start({screenshots:true,snapshots:true});

    await page.goto('https://demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').click();
    await page.locator('#loginusername').fill('pavan01');
    await page.locator('#loginusername').press('Tab');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavan01');

  //  context.tracing.stop({path:'trace.zip'});
  });