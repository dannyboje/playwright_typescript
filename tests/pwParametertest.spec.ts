import{test,expect} from "@playwright/test";

// testdata
const searchItems:string[]=['laptop','Gift card', 'smartphone'];

/* //using for-of loop
for(const item of searchItems)

{
console.log(item);
test(`Search test ${item}`, async ({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator('#small-searchterms').fill(item);
    await page.locator("input[value='Search']").click();
    await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, {ignoreCase:true});

});
} */

test.describe("Searching Items:", async() =>{
    searchItems.forEach((item) =>{
    
        console.log(item);
        test(`Search test ${item}`, async ({page})=>{
        
            await page.goto("https://demowebshop.tricentis.com/");
            await page.locator('#small-searchterms').fill(item);
            await page.locator("input[value='Search']").click();
            await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, {ignoreCase:true});
        
        });
    })
})

