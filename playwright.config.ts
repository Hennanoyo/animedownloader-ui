import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "vite --host 0.0.0.0 --port 4173",
    url: "http://127.0.0.1:4173/tests/browser/select.html",
    reuseExistingServer: false,
  },
});
