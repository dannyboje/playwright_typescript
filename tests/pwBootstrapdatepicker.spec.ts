import { test, expect, Locator, Page } from "@playwright/test";
/*
// ─── Helper: Dismiss / Cancel any sign-in popup or page ───────────────────────
async function dismissSignIn(page: Page) {

    // Option 1: Dismiss overlay button
    const dismissBtn: Locator = page.locator('[aria-label="Dismiss sign-in info."]');
    if (await dismissBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        console.log('Dismissing sign-in overlay...');
        await dismissBtn.click();
        return;
    }

    // Option 2: Close button (X) on sign-in modal
    const closeBtn: Locator = page.locator('[aria-label="Close"]');
    if (await closeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        console.log('Closing sign-in modal...');
        await closeBtn.click();
        return;
    }

    // Option 3: Press Escape to close any modal
    console.log('Pressing Escape to dismiss sign-in...');
    await page.keyboard.press('Escape');
}

// ─── Helper: month name → index ───────────────────────────────────────────────
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function toMonthIndex(month: string, year: string): number {
    return parseInt(year) * 100 + MONTHS.indexOf(month);
}

// ─── Helper: navigate calendar to target month ────────────────────────────────
async function navigateToMonth(targetMonth: string, targetYear: string, page: Page) {
    while (true) {

        const headers     = await page.locator('.bui-calendar__month').allTextContents();
        const leftHeader  = headers[0]?.trim().replace(/\s+/g, ' ');
        const rightHeader = headers[1]?.trim().replace(/\s+/g, ' ');

        const [leftMonth,  leftYear]  = leftHeader?.split(' ')  ?? [];
        const [rightMonth, rightYear] = rightHeader?.split(' ') ?? [];

        console.log(`Calendar: ${leftMonth} ${leftYear} | ${rightMonth} ${rightYear} | Target: ${targetMonth} ${targetYear}`);

        const targetIndex = toMonthIndex(targetMonth, targetYear);
        const leftIndex   = toMonthIndex(leftMonth  ?? '', leftYear  ?? '');
        const rightIndex  = toMonthIndex(rightMonth ?? '', rightYear ?? '');

        if (targetIndex === leftIndex || targetIndex === rightIndex) {
            console.log(`✅ Target month ${targetMonth} ${targetYear} is visible`);
            break;
        }

        if (targetIndex > leftIndex) {
            console.log('→ Navigating forward...');
            await page.locator('.bui-calendar__control--next').click();
        } else {
            console.log('← Navigating backward...');
            await page.locator('.bui-calendar__control--prev').click();
        }

        await page.waitForTimeout(500);
    }
}

// ─── Helper: click a specific day in the calendar ─────────────────────────────
async function selectDay(targetMonth: string, targetYear: string, targetDay: string, page: Page) {

    const allCells = page.locator('td[data-date]');
    const count    = await allCells.count();

    for (let i = 0; i < count; i++) {
        const cell     = allCells.nth(i);
        const dataDate = await cell.getAttribute('data-date');

        if (!dataDate) continue;

        const [yr, mo, dy] = dataDate.split('-');
        const cellMonth    = MONTHS[parseInt(mo) - 1];
        const cellYear     = yr;
        const cellDay      = String(parseInt(dy));

        if (cellMonth === targetMonth && cellYear === targetYear && cellDay === targetDay) {
            await cell.click();
            console.log(`✅ Clicked date: ${dataDate}`);
            return;
        }
    }

    throw new Error(`❌ Day ${targetDay} ${targetMonth} ${targetYear} not found in calendar`);
}

// ─── Main test ────────────────────────────────────────────────────────────────
test('Booking.com - Select dates without signing in', async ({ page }) => {

    // 👇 Change these to any dates you want
    const checkInYear   = "2026";
    const checkInMonth  = "May";
    const checkInDay    = "10";

    const checkOutYear  = "2026";
    const checkOutMonth = "May";
    const checkOutDay   = "15";

    // ── Step 1: Go to Cardiff search results ──────────────────────────────────
    await page.goto(
        "https://www.booking.com/searchresults.en-gb.html?ss=Cardiff&checkin=2026-04-18&checkout=2026-04-19&group_adults=1&no_rooms=1&group_children=1&age=9",
        { waitUntil: 'domcontentloaded', timeout: 60000 }
    );

    // ── Step 2: Dismiss sign-in if it appears ─────────────────────────────────
    await dismissSignIn(page);

    // ── Step 3: Open the calendar ─────────────────────────────────────────────
    console.log('Opening calendar...');
    await page.locator('[data-testid="date-display-field-start"]').click();

    // ── Step 4: Dismiss sign-in again if clicking calendar triggered it ────────
    await dismissSignIn(page);

    await page.waitForSelector('.bui-calendar', { state: 'visible', timeout: 10000 });

    // ── Step 5: Select check-in date ──────────────────────────────────────────
    console.log(`Navigating to check-in: ${checkInMonth} ${checkInYear}`);
    await navigateToMonth(checkInMonth, checkInYear, page);
    await selectDay(checkInMonth, checkInYear, checkInDay, page);

    // ── Step 6: Select check-out date ─────────────────────────────────────────
    console.log(`Navigating to check-out: ${checkOutMonth} ${checkOutYear}`);
    await navigateToMonth(checkOutMonth, checkOutYear, page);
    await selectDay(checkOutMonth, checkOutYear, checkOutDay, page);

    // ── Step 7: Verify dates ───────────────────────────────────────────────────
    const checkInValue  = await page.locator('[data-testid="date-display-field-start"]').textContent();
    const checkOutValue = await page.locator('[data-testid="date-display-field-end"]').textContent();

    console.log(`✅ Check-in:  ${checkInValue?.trim()}`);
    console.log(`✅ Check-out: ${checkOutValue?.trim()}`);

    // ── Step 8: Submit search ──────────────────────────────────────────────────
    await page.locator('[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded');
    console.log('✅ Search submitted successfully');
*/
});