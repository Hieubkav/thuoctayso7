import { expect, test } from "@playwright/test";

test.describe("Landing page", () => {
  test("hiển thị nội dung hero", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /dược sĩ trọng/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /đặt lịch tư vấn/i })).toBeVisible();
  });
});
