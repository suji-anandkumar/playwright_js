const {Given, When, Then, And}=require('@cucumber/cucumber')
const { test, expect, chromium} =require ('@playwright/test')
const {setDefaultTimeout} = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);
let browser;
let page;

Given('Open Nexudus Dashboard page', async function ()
{
    browser =await chromium.launch({headless: false});
    page = await browser.newPage();

    await page.goto('https://dashboard.nexudus.com/');
    await page.locator("text=NEXUDUS");
    await page.getByLabel('Email').isVisible();
    await page.getByLabel('Password').isVisible();
    await page.getByRole('button', { name: 'Sign in' }).isVisible();
    await expect(page).toHaveTitle('Sign in to Nexudus Platform');
    console.log("Login Page is Displayed")

});
Given('Open Nexudus Billing QA Dashboard page', async function ()
{
    browser =await chromium.launch({headless: false});
    page = await browser.newPage();

    await page.goto('https://dashboard.nexudus.com/qa/billing/products');
    await page.locator("text=NEXUDUS");
    await page.getByLabel('Email').isVisible();
    await page.getByLabel('Password').isVisible();
    await page.getByRole('button', { name: 'Sign in' }).isVisible();
    await expect(page).toHaveTitle('Sign in to Nexudus Platform');
    console.log("Login Page is Displayed")

});
When('Enter the userName as {string}', async function (username)
{
    await page.getByLabel('Email').fill(username);
    console.log("Entered username")

});
Then ('Enter the password as {string}', async function (pwd)
{
    await page.getByLabel('Password').fill(pwd);
    console.log("Entered password")

});
Then ('Submit the login button', async function ()
{
    await page.getByRole('button', { name: 'Sign in' }).click();
    console.log("Clicked on Submit button");
});
Then ('Verify if correct error is displayed when incorrect username or password is entered', async function ()
{
    await page.locator("text=The email or password is incorrect.");
    console.log("Error message displayed when logged in using incorrect username and password");
    await browser.close();

});
Then('Verify if user is able to login successfully when username or password is entered and landed at dashboard page', async function () {
    await page.locator("Dashboard").isVisible();
    console.log("User is landed in Dashboard page when valid username and password is entered");
    await browser.close();
});
Then('Click on Add New Product', async function () {
    await page.getByRole('button', { name: 'Add product' }).click();
    console.log("Clicked on Add New Product");
    await page.locator('div').filter({ hasText: /^Manual entryCreate this record field by field\.$/ }).nth(2).click();
});
Then('Enter the details of the new product as {string} and {string} and {string}', async function (name,des,price) {
    await page.getByLabel('Product name').fill(name);
    await page.getByLabel('Product description').fill(des);
    await page.getByLabel('Unit price').click();
    await page.getByLabel('Unit price').fill(price);
    await page.getByLabel('th', { exact: true }).click();
    await page.getByText('Portal and AppsSelect if and how this product will be listed in the portal and t').click();

    console.log("Entered the details for the new Product");

});
Then('Submit the product details', async function () {

   // await if(page.getByText('Could not save this record').isVisible()
    await page.getByRole('button', { name: 'Save changes' }).click();

    console.log("Submitted the details for a new Product");
});
Then('Verify if the newly created product is displayed on the Product list page {string}', async function (newprdname) {
    await page.getByPlaceholder('Type to search by name').click();
    await page.getByPlaceholder('Type to search by name').fill(newprdname);
    console.log("Searched for the newly created product");
    await page.locator(newprdname).isVisible();

});
Then('Delete the newly created product', async function () {
    await page.getByRole('checkbox', { name: 'Select this row' }).check();
    await page.getByRole('button', { name: 'Delete 1 record' }).click();
    await page.getByRole('button', { name: 'Yes, do it' }).click();
    console.log("Newly created product is selected for deletion");
});
Then('Verify if the deleted product is no longer displayed in the the product listing', async function () {
    await page.locator("span:has-text('No items found')").isVisible();
    console.log("Deleted product is no longed displayed in the product listing");
    await browser.close();
});