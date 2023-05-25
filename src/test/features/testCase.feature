Feature: Test

  Scenario: 001 log-in page shows a clear error message when invalid details are provided
    Given Open Nexudus Dashboard page
    When Enter the userName as "bad@example.com"
    Then Enter the password as "badpassword"
    Then Submit the login button
    Then Verify if correct error is displayed when incorrect username or password is entered

  Scenario: 002 Log-in page logs user in when valid details are provided
    Given Open Nexudus Dashboard page
    When Enter the userName as "adrian+1004930927@nexudus.com"
    Then Enter the password as "i0i1lgVD8OK8"
    Then Submit the login button
    Then Verify if user is able to login successfully when username or password is entered and landed at dashboard page

  Scenario: 003 - Can add and delete a product from the products list
    Given Open Nexudus Billing QA Dashboard page
    When Enter the userName as "adrian+1004930927@nexudus.com"
    Then Enter the password as "i0i1lgVD8OK8"
    Then Submit the login button
    Then Click on Add New Product
    Then Enter the details of the new product as "LatestProduct" and "Product added for ANewlyAddedProduct" and "2"
    Then Submit the product details
    Then Verify if the newly created product is displayed on the Product list page "ANewlyAddedProduct"
    Then Delete the newly created product
    Then Verify if the deleted product is no longer displayed in the the product listing
