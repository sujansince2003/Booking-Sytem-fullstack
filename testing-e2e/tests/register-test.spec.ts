import { test, expect } from '@playwright/test';


const FRONTEND_URL = "http://localhost:5173/"

test('should allow the user to register', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    //get the login button and click on it
    await page.getByRole("link", { name: "register" }).click();



    // generate random data
    const fname = Math.random().toString(36).substring(2, 10);
    const lname = Math.random().toString(36).substring(2, 10);
    const email = (Math.random().toString(36).substring(2, 10)) + "@gmail.com";
    const password = "test123";


    console.log(fname, lname, email, password)



    await expect(page.getByRole("heading", { name: "create an account" })).toBeVisible();
    await page.locator("[name=firstName]").fill(fname);
    await page.locator("[name=lastName]").fill(lname);
    await page.locator("[name=email]").fill(email);

    await page.locator("[name=password]").fill(password);
    await page.locator("[name=confirmPassword]").fill(password);

    await page.getByRole("button", { name: "create account" }).click();


    // get back to the homepage after login

    await expect(page.getByText("Registered Successfully")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible()




    // Expect a title "to contain" a substring.
    // await expect(page).toHaveTitle(/Playwright/);
});

