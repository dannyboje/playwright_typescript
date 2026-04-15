import {test, expect, Locator} from "@playwright/test";

test ('Comparing Methods', async ({page})=> {

    await  page.goto("https://demowebshop.tricentis.com");

    const products:Locator = page.locator('.product-title');

    // 1) innerText() VS TextContent()
   //  console.log(await products.nth(1).innerText());
    // console.log(await products.nth(1).textContent());
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        const text1: string = await products.nth(i).innerText();
        console.log(`products ${i + 1}: ${text1}`);
        console.log(`----------------------------------------------------------`);

        const text2: null|string = await products.nth(i).textContent();
        console.log(`products ${i + 1}: ${text2}`);
        console.log(`----------------------------------------------------------`);

        const text3: null|string = await products.nth(i).textContent();
        console.log(`products ${i + 1}: ${text3?.trim()}`);
        console.log(`----------------------------------------------------------`);
    }



    // 2) allInnertext() vs allTextContent()
    console.log(`Comparing allInnertext() vs allTextContent()`);
    console.log(`----------------------------------------------------------`);
    const productNames1: string[] = await products.allInnerTexts();
    console.log(`Product Names captured by allInnerText():`, productNames1);
    console.log(`----------------------------------------------------------`);

    const productNames2: string[] = await products.allTextContents();
    console.log(`Product Names captured by allTextContent():`, productNames2);
    console.log(`----------------------------------------------------------`);

    const productNamesTrimmed: string[] = await products.allTextContents();
    console.log(`Product Names captured by allTextContent() after trimmed:`, productNamesTrimmed.map(text=>text.trim()));
    console.log(`----------------------------------------------------------`);

// 3) all()

const productsLocators: Locator[] = await products.all();
console.log(productsLocators);
console.log(`----------------------------------------------------------`);

// console.log(await productsLocator[1].innerText());

//for of loop
for (let producloc of productsLocators)
{
    console.log(await producloc.innerText());
}

console.log(`----------------------------------------------------------`);
// for in loop

for (let i in productsLocators)
{
    console.log(await productsLocators[i].innerText());
}

});