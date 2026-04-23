/*
Open app -- before all

Login
                Find Products
Logout

Login
add product to card
Logout

close app --- afterAll()
*/

import {test, expect, Page} from "@playwright/test";

let page: Page;

test.beforeAll('Open App', async({browser})=>{
    page = await browser.newPage();
    await page.goto('https://demoblaze.com/index.html');
});


test.afterAll('Closing App', async()=>{
    await page.close();
});

test.beforeEach('Login', async()=>{

    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('pavan01');
    await page.locator('#loginpassword').fill('test@123');
    await page.locator("button[onclick='logIn()']").click();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavan01');

});

test.afterEach('Logout', async()=>{
    
    await page.locator('#logout2').click();
    
});




test.describe('mygroup', async() =>{

    test ('Find No of Products', async()=>{
        const products = page.locator('#tbodyid .hrefch');
        const count = await products.count();
        console.log('Number of Products:', count);
        await expect(products).toHaveCount(9);
    });
    
    test ('Add Product to cart', async()=>{
        await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    
        //Handle alert before the click
            page.on('dialog',async (dialog) =>{
                expect(dialog.message()).toContain('Product added');
                await dialog.accept();
            });
    
            await page.locator('.btn.btn-success.btn-lg').click();
    
    });
    

})

