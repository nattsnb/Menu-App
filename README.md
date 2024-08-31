# Menu App

Simple app made for customers place their orders online and to track them after. It also allows the owner to add dishes and prices to the menu as well as change status of the order.

## App installation:

1. Pull repo to your directory
2. Pull API repo https://github.com/Solnick/orders-products-simple-api
3. Install and start api repo

`npm install`

4. Run API repo on localhost 3000

`npm run start`

5. Start and install menu repo

`npm install`

6. Run menu repo on other localhost

`npm run dev`

## Branches:

### Master

Basic website file structure, nothing to display.

### EditMenu

Website where owner can introduce changes or new entries to the products category on API server. Every entry on displayed list of products that have been already in menu have two buttons. Edit - turns entry into the form where we can introduce and save changes, and delete - one that soft deletes the product from server changing isDeleted key value to yes. Soft deleted products do not appear on any version of menu.

### Order Menu

Website where customer can edit and place the order. Plus/minus buttons allows to add number of dishes to order. Form asks to provide the address. If both provided it does create new order on the server and pops out confirmation to move to order status tracking page.

### Orders

Website where owner sees all orders that were placed. They can change status of the order from dropdown-list. the dropdown-list default option is the current order status. after choosing another option the patch fetch is sent. The orders are displayed in order: InProgress, Delivery, Finished. After changing the status the app fetches new data and refreshes list order.
