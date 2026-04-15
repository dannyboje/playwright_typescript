import {test, expect, Locator} from "@playwright/test";

test ('Verify Chrome CPU load in dynamic table', async ({page})=> {

    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table:Locator=page.locator("table.table tbody");
    await expect (table).toBeVisible();

    // Select all the rows, then find number of rows 

    const rows:Locator[]= await table.locator("tr").all();
    console.log("Number of rows in a table:", rows.length);
    expect(rows).toHaveLength(4);

    // Step 1: For Chrome process get value of CPU load.
    // Read each row check Chrome presence 
    let cpuLoad = '';
    for(const row of rows)
    {
        const processName:string= await row.locator("td").nth(0).innerText();
        if (processName === 'Chrome')
        {
            // cpuLoad= await row.locator('td:has-text("%")').innerText();
            cpuLoad= await row.locator("td",{hasText:'%'}).innerText();
            console.log("CPU Load of Chrome:", cpuLoad);
            break;
        }
    }

    // STep 2: Compare it with value in the yellow Label

    let yellowboxtext: string = await page.locator("#chrome-cpu").innerText();
    let trimmed: string = yellowboxtext.split('%')[0] + '%';
    console.log("Chrome CPU load from yellow box before trimming:", yellowboxtext);
    console.log("Chrome CPU load from yellow box:", trimmed);
    console.log(`----------------------------------------------------------`);

    if (trimmed.includes(cpuLoad))
    {
        console.log("Chrome CPU load of chrome is equal");
    }
    else{
        console.log("Chrome CPU load of chrome is not equal");
    }

    expect(yellowboxtext).toContain(cpuLoad);

});