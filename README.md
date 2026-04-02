Pre Condition
  - Node 14+ above should be installed 

Installing Playwright
Get started by installing Playwright using one of the following methods.

Using npm, yarn or pnpm
The command below either initializes a new project or adds Playwright to an existing one.

npm
yarn
pnpm
'npm init playwright@latest'

When prompted, choose / confirm:

TypeScript or JavaScript (default: TypeScript)
Tests folder name (default: tests, or e2e if tests already exists)
Add a GitHub Actions workflow (recommended for CI)
Install Playwright browsers (default: yes)
You can re-run the command later; it does not overwrite existing tests.

Using the VS Code Extension
You can also create and run tests with the VS Code Extension.

What's Installed
Playwright downloads required browser binaries and creates the scaffold below.

playwright.config.ts         # Test configuration
package.json
package-lock.json            # Or yarn.lock / pnpm-lock.yaml
tests/
  example.spec.ts            # Minimal example test

The playwright.config centralizes configuration: target browsers, timeouts, retries, projects, reporters and more. In existing projects dependencies are added to your current package.json.

tests/ contains a minimal starter test.

Running the Example Test
By default tests run headless in parallel across Chromium, Firefox and WebKit (configurable in playwright.config). Output and aggregated results display in the terminal.

npm
yarn
pnpm
npx playwright test

tests running in command line

Tips:

See the browser window: add --headed.
Run a single project/browser: --project=chromium.
Run one file: npx playwright test tests/example.spec.ts.
Open testing UI: --ui.
See Running Tests for details on filtering, headed mode, sharding and retries.

HTML Test Reports
After a test run, the HTML Reporter provides a dashboard filterable by the browser, passed, failed, skipped, flaky and more. Click a test to inspect errors, attachments and steps. It auto-opens only when failures occur; open manually with the command below.

npm
yarn
pnpm
npx playwright show-report

HTML Report

Running the Example Test in UI Mode
Run tests with UI Mode for watch mode, live step view, time travel debugging and more.

npm
yarn
pnpm
npx playwright test --ui

UI Mode

See the detailed guide on UI Mode for watch filters, step details and trace integration.

Updating Playwright
Update Playwright and download new browser binaries and their dependencies:

npm
yarn
pnpm
npm install -D @playwright/test@latest
npx playwright install --with-deps

Check your installed version:

npm
yarn
pnpm
npx playwright --version

System requirements
Node.js: latest 20.x, 22.x or 24.x.
Windows 11+, Windows Server 2019+ or Windows Subsystem for Linux (WSL).
macOS 14 (Ventura) or later.
Debian 12 / 13, Ubuntu 22.04 / 24.04 (x86-64 or arm64).
