import {test, expect, Locator} from "@playwright/test";

test.describe.serial('Data table tests', () => {

    test('Read data from all the table pages', async ({page})=> {
        await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

        let hasmorepages = true;
        while(hasmorepages) {
            const rows = await page.locator('#example tbody tr').all();
            for(let row of rows) {
                console.log(await row.innerText());
            }
            console.log(`-----------------------------------------------------------------------------------------------`);
            await page.waitForTimeout(500);

            const nextButton: Locator = page.locator("button[aria-label='Next']");
            const isDisabled = await nextButton.getAttribute('class');

            if(isDisabled?.includes('disabled')) {
                hasmorepages = false;
            } else {
                await nextButton.click();
            }
        }
    });

    test('Filter the rows and check the row count', async ({page})=> {
        await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

        const dropdown: Locator = page.locator('#dt-length-0');
        await dropdown.selectOption({label: '25'});

        const rows = await page.locator("#example tbody tr").all();
        expect(rows.length).toBe(25);

        const rows2 = await page.locator("#example tbody tr");
        await expect(rows2).toHaveCount(25);
        console.log('Search results are as expected');
    });

    test('Search for specific data in a table', async ({page})=> {
        await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

        const searchbox: Locator = page.locator('#dt-search-0');
        await searchbox.fill("Paul Byrd");

        const rows = await page.locator("#example tbody tr").all();

        if (rows.length >= 1) {
            let matchFound = false;
            for(let row of rows) {
                const text = await row.innerText();
                if (text.includes('Paul Byrd')) {
                    console.log('Record Exist - found', text);
                    matchFound = true;
                    break;
                }
            }
            expect(matchFound).toBeTruthy();
        } else {
            console.log('No results found with search text');
        }
    });

});