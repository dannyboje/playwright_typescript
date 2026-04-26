import { test, expect } from "@playwright/test";

const loginTestData: string[][] = [
    ["laura.taylor1234@example.com", "test123", "valid"],
    ["laura.taylor1234@example.com", "wrongpassword", "invalid"],
    ["invalidemail@example.com", "test123", "invalid"],
    ["", "", "invalid"],
];

test.describe('Login data driven test', () => {
    for (const [email, password, validity] of loginTestData) {
        test(`Login test for ${email} and ${password}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');
            await page.locator('#Email').fill(email);
            await page.locator('#Password').fill(password);
            await page.locator('input[value="Log in"]').click();

            if (validity.toLowerCase() === 'valid') {
                const logoutLink = page.locator('a[href="/logout"]');
                await expect(logoutLink).toBeVisible({ timeout: 5000 });
            } else {
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 5000 });
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        });
    }
});