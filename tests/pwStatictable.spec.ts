import {test, expect, Locator} from "@playwright/test";

test ('Static Web tables', async ({page})=> {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

//    1) count number of rows in a table

const rows:Locator=table.locator("tr"); // returns all the rows including header
await expect(rows).toHaveCount(7); // approach 1

console.log(`----------------------------------------------------------`);

const rowCount : number = await rows.count();
console.log("Number of rows in a table: ", rowCount);
expect(rowCount).toBe(7); // approach 2

// 2) count number of headers/colums 
console.log(`----------------------------------------------------------`);
const columns:Locator = rows.locator("th");
await expect(columns).toHaveCount(4);

const columnCount: number = await columns.count();
console.log("Number of columns in a table: ", columnCount);
expect(columnCount).toBe(4);
console.log(`----------------------------------------------------------`);

// 3) Read all data from 2nd row

const secondrowCells:Locator = rows.nth(2).locator('td');

const secondrowText: string[] = await secondrowCells.allInnerTexts();
console.log("2nd Row data: ", secondrowText);

await expect(secondrowCells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']); //assertion
console.log(`----------------------------------------------------------`);

// 4) Read all data from the table (excluding header)

const allRowData = await rows.all(); //get all row locators // all(returns array of locators )
console.log("BookName        Author         Subject        price");
console.log(`----------------------------------------------------------`);

for(let row of allRowData.slice(1)) // slice(1) skips the header
{
    const cols= await row.locator("td").allInnerTexts();
    console.log(cols.join('\t'));
}
console.log(`----------------------------------------------------------`);

// 5) Print book names where the author name is Mukesh
console.log(`books Written by Mukesh........`);

const mukeshBooks:string[]=[];
for(let row of allRowData.slice(1)) // slice(1) skips the header
{
   const cells= await row.locator('td').allInnerTexts();
   const author=cells[1];
   const Book=cells[0];

   if(author === 'Mukesh')
   {
    console.log(`${author} \t ${Book}`)
    mukeshBooks.push(Book);
   }
}
expect(mukeshBooks).toHaveLength(2); //Assertion

// 6) Caluclate the total price of the books

console.log(`----------------------------------------------------------`);

let totalPrice:number=0;

for(let row of allRowData.slice(1)) // slice(1) skips the header
{
   const cells= await row.locator('td').allInnerTexts();
   const price=cells[3];

   totalPrice = totalPrice+parseInt(price);
}

console.log("Total Price of all Books: ",totalPrice );

expect(totalPrice).toBe(7100);
console.log(`----------------------------------------------------------`);

});