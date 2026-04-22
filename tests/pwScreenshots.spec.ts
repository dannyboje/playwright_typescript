import{test,expect} from "@playwright/test";

test('Screenshots Demo', async ({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");
    
    const timestamp = Date.now();

   //  await page.screenshot({ path: 'screenshots/' + 'homepage' + '_' + timestamp + '.png' });

   // await page.screenshot({path:'screenshots/'+'fullpage_'+timestamp+'.png', fullPage:true});

   //const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
   // await logo.screenshot({path:'screenshots/' + 'logo' + '_' + timestamp + '.png' });

   // await page.locator("img[alt='Tricentis Demo Web Shop']").screenshot({path:'screenshots/' + 'logo' + '_' + timestamp + '.png' });

    await page.locator('.product-grid.home-page-product-grid').screenshot({path:'screenshots/' + 'featured' + '_' + timestamp + '.png' });
})


test ('Screenshots from config', async ({page})=>{

  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('pavan01');
  await page.locator('#loginusername').press('Tab');
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavan01');
})