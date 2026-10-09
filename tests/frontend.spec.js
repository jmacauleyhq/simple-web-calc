const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5500");
});

test("display starts at zero", async ({ page }) => {
    await expect(page.locator("#calc-screen")).toHaveText("0");
});

test("entering digits updates the display", async ({ page }) => {
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();

    await expect(page.locator("#calc-screen")).toHaveText("23");
});

test("decimal point cannot be entered twice", async ({ page }) => {
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: ".", exact: true }).click();
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByRole("button", { name: ".", exact: true }).click();

    await expect(page.locator("#calc-screen")).toHaveText("1.2");
});

test("backspace removes the last digit", async ({ page }) => {
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByRole("button", { name: "Backspace" }).click();

    await expect(page.locator("#calc-screen")).toHaveText("1");
});

test("polarity button makes a number negative", async ({ page }) => {
    await page.getByRole("button", { name: "5", exact: true }).click();
    await page.getByRole("button", { name: "+/-" }).click();

    await expect(page.locator("#calc-screen")).toHaveText("-5");
});

test("clear button resets the current number", async ({ page }) => {
    await page.getByRole("button", { name: "5", exact: true }).click();
    await page.getByRole("button", { name: "C" }).click();

    await expect(page.locator("#calc-screen")).toHaveText("0");
    await expect(page.locator("#clear-btn")).toHaveText("AC");
});

test("addition sends the correct request and displays the result", async ({ page }) => {
    await page.route("**/calc", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ result: 5 }),
        });
    });

    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();

    const requestPromise = page.waitForRequest("**/calc");

    await page.getByRole("button", { name: "Equals" }).click();

    const request = await requestPromise;

    expect(request.postDataJSON()).toEqual({
        numA: 2,
        numB: 3,
        _operator: 4,
    });

    await expect(page.locator("#calc-screen")).toHaveText("5");
});
