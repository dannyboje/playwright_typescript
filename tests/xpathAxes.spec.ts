import {test,expect, Locator} from "@playwright/test"

test("Xpath Axes demo", async ({page})=>{
    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //self axis - 

    const germanyCell: Locator = page.locator("//td[text()='Germany']/self::td");
    await expect(germanyCell).toHaveText('Germany');

    //parent axis -

    const parentRow: Locator = page.locator("//td[text()='Germany']/parent::tr")
    await expect(parentRow).toContainText('Maria Anders');
    console.log("All contents:",await parentRow.textContent());

    // 3. child axes
    const secondRowCells: Locator = page.locator("//table[@id='customers']//tr[2]/child::td")
    await expect(secondRowCells).toHaveCount(3);
    console.log(secondRowCells);

    //4. ancestor axes
    const table: Locator = page.locator("//td[text()='Germany']/ancestor::table");
    await expect(table).toHaveAttribute('id','customers');
    
    //5. descendent axes
    const allTds: Locator = page.locator("//table[@id='customers']/descendant::td");
    await expect(allTds).toHaveCount(18);

    //6. following axes

    const followingCell: Locator = page.locator("//td[normalize-space()='Germany']/following::td[1]");
    await expect(followingCell).toHaveText("Centro comercial Moctezuma");

    //6. following-sibling axes

    const rightsiblings: Locator = page.locator("//td[normalize-space()='Maria Anders']/following-sibling::td");
    await expect(rightsiblings).toHaveCount(1);

    //7.preceding
    const precedingCell: Locator = page.locator("//td[text()='Germany']/preceding::td[1]");
    await expect(precedingCell).toHaveText('Maria Anders');


    //8. preceding-siblings

    const leftSiblings: Locator = page.locator("//td[text()='Germany']/preceding-sibling::td");
    await expect(leftSiblings).toHaveCount(2);

    expect(leftSiblings.nth(0)).toHaveText("Alfreds Futterkiste")
    expect(leftSiblings.nth(1)).toHaveText("Maria Anders")

    console.log("Left Siblings:",await leftSiblings.nth(0).textContent());
})