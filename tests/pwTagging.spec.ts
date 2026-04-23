/*
test 1 - sanity
test2 - Sanity regression
Test3 - regression


run only sanity.....
npx playwright test ./tests/pwTagging.spec.ts --grep "@sanity"

npx playwright test ./tests/pwTagging.spec.ts --grep "@regression"

npx playwright test ./tests/pwTagging.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"

npx playwright test ./tests/pwTagging.spec.ts --grep "@sanity" --grep-invert

(?=.*@sanity)(?=.*@regression)
*/

import {test, expect, Page} from "@playwright/test";

/* test ('@sanity @regression Check title of the home page', async ({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');

}); */

test ('Check title of the home page',{tag:'@sanity'}, async ({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');

});


test('Check Navigation to Store page', { tag: '@regression' }, async ({ page }) => {
    await page.goto('https://www.google.com/');

    // Handle cookie consent banner
    try {
        await page.getByRole('button', { name: 'Accept all' }).click({ timeout: 5000 });
    } catch {
        try {
            await page.getByRole('button', { name: 'Reject all' }).click({ timeout: 5000 });
        } catch {
            // No banner appeared, continue
        }
    }

    // Wait for intercepting overlay to disappear
    await page.locator('.jw8mI').waitFor({ state: 'hidden' });

    await page.getByRole('link', { name: 'Store' }).click();

    await expect(page).toHaveTitle('Google Store for Google Made Devices & Accessories');
});

test('Check Top Recommendations', { tag: ['@sanity', '@regression'] }, async ({ page }) => {
    await page.goto('https://www.google.com/');

    // Handle cookie consent banner - try all possible button texts
    try {
        await page.getByRole('button', { name: 'Accept all' }).click({ timeout: 5000 });
    } catch {
        try {
            await page.getByRole('button', { name: 'Reject all' }).click({ timeout: 5000 });
        } catch {
            // No banner appeared, continue
        }
    }

    // Wait for banner to disappear before clicking Store
    await page.locator('.jw8mI').waitFor({ state: 'hidden' });

    await page.getByRole('link', { name: 'Store' }).click();

    await expect(page.locator("text='Popular on the Google Store.'"))
        .toHaveText('Popular on the Google Store.');
});