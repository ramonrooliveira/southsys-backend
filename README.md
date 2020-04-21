### About this project

This is my implementation of the API challenge proposed by South System, for the backend developer position.

Tech: Node.js, Express, MongoDB, Mongoose, Mocha & Chai (testing).

### available scripts

#### `npm install`

Installs the dependencies.

#### `npm run dev`

Runs the development server, at [localhost:3000](localhost:3000)

#### `npm test`

Runs unit tests

### endpoints

The app is hosted on Heroku, and can be accessed at [https://south-sys.herokuapp.com/](https://south-sys.herokuapp.com/). The following endpoints are available: 

#### `/authenticate`
To login. Receives URL encoded form with username and password;
Available logins: admin (password: admin) | client (pasword: client)

#### `/logout`
To logout.

#### `/users`
To create a user. Must be authenticated as an admin. Receives URL encoded form with username and password;

#### `GET /products`
To retrieve a list of products. To paginate, include optional parameters: limit and page (e.g. /products/:limit/:page)

#### `POST /products`
To create a product. Must be authenticated as an admin. Receives URL encoded form with product name;

#### `GET /products/:productId`
To retrieve info about a single product. Receives a request parameter productId;

#### `PUT /products/:productId`
To update the info of a single product. Must be authenticated as an admin. Receives a request parameter productId;

#### `DELETE /products/:productId`
To delete a product record. Must be authenticated as an admin. Receives a request parameter productId;

#### `GET /productSearch/:productName`
To retrieve a list of products matching the search. Receives a request parameter productName to match product names (not exactly equals, can be only a part of the name and in different casing);

