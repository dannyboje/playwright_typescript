import {test, expect, Locator} from "@playwright/test"

test ("XPath demo in PW", async ({page})=>{
//1. Absolute xpath
await page.goto("https://demowebshop.tricentis.com/");
const absolutelogo: Locator = page.locator("//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
 await expect (absolutelogo).toBeVisible();

 //2. Relative xpath
 const relativelogo: Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
 await expect (relativelogo).toBeVisible();

 //3.contains()

 const products: Locator = page.locator("//h2/a[contains(@href,'computer')]");
 const productsCount: number = await products.count();
 console.log("No of Computer related products:", productsCount)
 expect (productsCount).toBeGreaterThan(0);
 // console.log(await products.textContent()); //Error.strict mode violation:

 console.log("First computer related products:",await products.first().textContent());
 console.log("Last computer related products:",await products.last().textContent());
 console.log("Nth computer related products:",await products.nth(1).textContent());
 let productTitles:string[] = await products.allTextContents();

 for(let pt of productTitles)
 {
    console.log(pt);
 }

 // console.log("All computer related products:",await products.allTextContents());

 // 4.startWith()

 const buildingProducts: Locator = page.locator("//h2/a[contains(@href,'/build')]");
 const count : number = await buildingProducts.count();
 expect(count).toBeGreaterThan(0);

 //5.text()

 const reglink: Locator =page.locator("//a[text()='Register']");
await expect(reglink).toBeVisible();

//6. last()

const lastitem: Locator = page.locator("//div[@class='column follow-us']//li[last()]");
await expect(lastitem).toBeVisible();
console.log ("Text content of last element is: ", await lastitem.textContent());

//7. position()

const positionitem: Locator = page.locator("//div[@class='column follow-us']//li[position()=3]");
await expect(positionitem).toBeVisible();
console.log ("Text content of position element is: ", await positionitem.textContent());
})
