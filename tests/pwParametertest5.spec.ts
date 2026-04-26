/* Pre-requisite:
   Install the xlsx module to read Excel files
   npm install xlsx
*/
import { test, expect } from "@playwright/test";
import * as XLSX from 'xlsx';

// Define the type
interface LoginData {
    email: string;
    password: string;
    expectedResult: string;
}

// Reading data from xlsx
const xlsxPath = "testdata/data.xlsx";
const workbook = XLSX.readFile(xlsxPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const records = XLSX.utils.sheet_to_json<LoginData>(worksheet);

// main test
test.describe('Login data driven test', () => {
    for (const data of records) {
        test(`Login test for ${data.email} and ${data.password}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');
            await page.locator('#Email').fill(data.email ?? '');
            await page.locator('#Password').fill(data.password ?? '');
            await page.locator('input[value="Log in"]').click();

            if (data.expectedResult.toLowerCase() === 'valid') {
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