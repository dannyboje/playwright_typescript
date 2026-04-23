//Annotations
// ----------------
/*
only
skip
fail
fixme
slow
*/


import {test, expect, Page} from "@playwright/test";

test ('Test 1', async ({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})


test.skip('Test 2', async ({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})

//skip the test based on some condition

test('Test 3', async ({page,browserName}) => {
    test.skip(browserName === 'chromium', 'this test ski[[ed of browser is firefox');

    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})

test ('Test 4', async ({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});
//fixme
test.fixme('Test 5', async ({page}) => {
    await page.goto('https://www.google.com/');
    // No assertion
});

//slow
test('Test 6', async ({page}) => {
    test.slow();
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

