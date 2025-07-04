import { test, expect } from '@playwright/test';


const FRONTEND_URL = "http://localhost:5173/"

test('should allow the user to sign In', async ({ page }) => {
  await page.goto(FRONTEND_URL);

  //get the login button and click on it
  await page.getByRole("link", { name: "login" }).click();


  await expect(page.getByRole("heading", { name: "login" })).toBeVisible();
  await page.locator("[name=email]").fill("0uur79r2@gmail.com");
  await page.locator("[name=password]").fill("test123");

  await page.getByRole("button", { name: "Login" }).click();


  // get back to the homepage after login

  await expect(page.getByText("Logged In Successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()




  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

