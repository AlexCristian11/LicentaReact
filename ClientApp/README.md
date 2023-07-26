# OnlineCave

### OnlineCave is a full-stack e-commerce web application with the purpose of selling electronic products online.

The main page contains an image carousel to display products that sell well, ads for specific products, or marketing campaigns.

Under the carousel, a series of buttons represent the selection of product categories. When a button is clicked, the products inside that category will show up, and the button will change color to indicate the selected category. If no button is selected, all products will be displayed.

The products are displayed in a card-style manner. The card shows the product image, price, and a button to redirect to the cart. Clicking on a product redirects the user to the product page, where they can find the product's name, price, description, and an 'add to cart' button that adds the product to the cart.

To add products to the cart, users need an account. If the user doesn't have an account, they can register using the register page and enter their personal information, such as first name, last name, email address, home address, and password. This information will be transmitted to the backend and added to the database accordingly. The password will be automatically encrypted using SHA256. After a user logs in, a JWT token will be issued.

On the login page, the user enters their email address and password and clicks "Sign In." If the user logs in with the correct credentials, a green notification saying "Logged in successfully" will appear in the top right-hand corner. If the credentials are wrong, a red notification will inform the user that they didn't log in successfully.

After logging in, the user can add products to their cart, view their account page, and change their personal information.

On the account page, the user sees their information and an "Edit" button to edit the information in the database. Next to it are the orders that the user made. If there are no orders, a text will indicate that there are no orders yet. The orders will contain the receipt number, the date it was made, and the total price.

On the cart page, the products added will be displayed on the left, each with a name, price, image, an option to add more of the same product to the order, and a button to delete that product from the cart. On the right side of the page, the order details will be shown, including the number of products, their names, and at the bottom, the total price of the order. Under the details is the button to complete the order, which registers the order in the database and issues a receipt. This updates the account page with the new order.

When an admin logs in, their page will allow them to change information across the app using a user-friendly interface that updates the database without making SQL statements. The admin can add or remove a user, using the same input fields as the register page. Adding a user requires the user's personal information, while removing will need the user id. New products and categories can be added or removed similarly. The interface uses backend requests to the database to achieve these functionalities.

In terms of design, the app strives to be easily understood, readable, modern, and efficient. The navmenu bar at the top of the screen has an icon depicting a moon, signaling the possibility of changing the app to dark mode. The dark mode will take effect across the whole application. If the dark mode is active, the icon will change to display a sun, indicating the user's ability to change back to light mode.