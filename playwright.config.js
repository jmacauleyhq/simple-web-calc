const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./tests",
    testMatch: "**/*.spec.js",

    use: {
        browserName: "chromium",
    },

    webServer: {
        command: "python app.py",
        url: "http://127.0.0.1:5500",
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
    },
});