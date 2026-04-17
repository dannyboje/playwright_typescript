import { test, expect } from '@playwright/test';

test('Booking.com Date Picker Test - Check-in and Check-out', async ({ page }) => {
  await page.goto('https://www.booking.com/');

  // Handle cookie consent popup
  try {
    await page.locator('button:has-text("Accept")').click({ timeout: 5000 });
    console.log('Cookie popup accepted');
  } catch (e) {
    console.log('Cookie popup not found, continuing...');
  }

  // Handle Genius / Sign-in popup
  try {
    const signInPopup = page.locator('[role="dialog"]').first();
    if (await signInPopup.isVisible({ timeout: 5000 })) {
      await page.keyboard.press('Escape');
      console.log('Sign-in popup dismissed via Escape');
    }
  } catch (e) {
    console.log('Sign-in popup not found, continuing...');
  }

  await page.waitForLoadState('networkidle');

  // Click on the date picker field to open calendar
  await page.getByTestId('searchbox-dates-container').click();
  await page.waitForTimeout(2000);

  // ---- DEBUG: log all h3 tags to find the right selector ----
  const allH3 = await page.locator('h3').all();
  for (const h3 of allH3) {
    const text = await h3.innerText().catch(() => '');
    const ariaLive = await h3.getAttribute('aria-live').catch(() => '');
    const className = await h3.getAttribute('class').catch(() => '');
    console.log(`H3 -> text: "${text}" | aria-live: "${ariaLive}" | class: "${className}"`);
  }

  // Helper: get month/year using multiple fallback selectors
  async function getMonthYear(index: number): Promise<string> {
    const selectors = [
      "h3[aria-live='polite']",                          // original
      "h2[aria-live='polite']",                          // maybe h2 now
      "[data-testid='searchbox-datepicker-calendar'] h3",
      "[data-testid='searchbox-datepicker-calendar'] h2",
      ".bui-calendar__month",
      "[class*='month-name']",
      "[class*='CalendarMonth'] strong",
      "span[aria-live='polite']",
      "[aria-live='polite']",                            // any element with aria-live
    ];

    for (const selector of selectors) {
      try {
        const els = await page.locator(selector).all();
        if (els.length > index) {
          const text = await els[index].innerText({ timeout: 2000 });
          if (text?.trim()) {
            console.log(`✅ Month/year selector that worked: "${selector}" -> "${text}"`);
            return text.trim();
          }
        }
      } catch { /* try next */ }
    }
    throw new Error(`Could not find month/year header at index ${index}`);
  }

  // Helper: get date cells using multiple fallback selectors
  async function getDateCells(index: number) {
    const selectors = [
      `table.b8fcb0c66a tbody`,
      `[data-testid='searchbox-datepicker-calendar'] tbody`,
      `.bui-calendar__dates tbody`,
      `table tbody`,
    ];

    for (const selector of selectors) {
      try {
        const tables = await page.locator(selector).all();
        if (tables.length > index) {
          const cells = await tables[index].locator('td').all();
          if (cells.length > 0) {
            console.log(`✅ Date cell selector that worked: "${selector}"`);
            return cells;
          }
        }
      } catch { /* try next */ }
    }
    throw new Error(`Could not find date cells at index ${index}`);
  }

  // ==== Check-in Date Selection ====
  const checkinYear = "2026";
  const checkinMonth = "June";
  const checkinDay = "20";

  while (true) {
    const monthYear = await getMonthYear(0);
    const [currentMonth, currentYear] = monthYear.split(" ");
    console.log(`Check-in calendar: ${currentMonth} ${currentYear}`);

    if (currentMonth === checkinMonth && currentYear === checkinYear) break;

    await page.locator('button[aria-label="Next month"]').click();
    await page.waitForTimeout(500);
  }

  const checkinCells = await getDateCells(0);
  let checkinDateSelected = false;

  for (const cell of checkinCells) {
    const text = (await cell.innerText()).trim();
    if (text === checkinDay) {
      await cell.click();
      checkinDateSelected = true;
      break;
    }
  }

  expect(checkinDateSelected).toBeTruthy();

  // ==== Check-out Date Selection ====
  const checkoutYear = "2026";
  const checkoutMonth = "July";
  const checkoutDay = "25";

  while (true) {
    const monthYear = await getMonthYear(1);
    const [currentMonth, currentYear] = monthYear.split(" ");
    console.log(`Check-out calendar: ${currentMonth} ${currentYear}`);

    if (currentMonth === checkoutMonth && currentYear === checkoutYear) break;

    await page.locator('button[aria-label="Next month"]').click();
    await page.waitForTimeout(500);
  }

  const checkoutCells = await getDateCells(1);
  let checkoutDateSelected = false;

  for (const cell of checkoutCells) {
    const text = (await cell.innerText()).trim();
    if (text === checkoutDay) {
      await cell.click();
      checkoutDateSelected = true;
      break;
    }
  }

  expect(checkoutDateSelected).toBeTruthy();

  await page.waitForTimeout(5000);
});