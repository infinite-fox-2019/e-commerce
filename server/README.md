# RestFull API e-Commerce

This is a restfull api for create functional e-Commerce.  The following are the routes we provide:

`/products` ,`/admins`, `/transactions`, `/carts`, and `/users` 



## /products

| Route        | HTTP   | Header(s) | Body                                                         | Description        |
| ------------ | ------ | --------- | ------------------------------------------------------------ | ------------------ |
| /product     | GET    | `none`    | `none`                                                       | Get All Products   |
| /product/:id | GET    | `none`    | `none`                                                       | Get One Product    |
| /product     | POST   | `token`   | `name: String`,<br />`description: String`,<br />`stock: Number`,<br />`price: Number` | Create New Product |
| /product/:id | PATCH  | `token`   | `name: String`,<br />`description: String`,<br />`stock: Number`,<br />`price: Number` | Update Product     |
| /product/:id | DELETE | `token`   | `none`                                                       | Delete Product     |



### Get all products

| URL              | http://localhost:3000/products                               |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | GET                                                          |
| Parameter        | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `none`                                                       |
| Success Response | `status:200`, Data:<br />[<br />    {<br />        "_id": 1,<br />        "name": "Big Fridge",<br />        "description": "One place for save your vegeatables",<br />        "stock": 20,<br />        "price": 20000,<br />    }<br />] |
| Error Response   | `status:401`, Data :<br />{<br />    "message": "You are unauthorized"<br />} |
| Error Response 2 | `status:404`, Data :<br />{<br />    "message": "No data"<br />} |



### Get one products

| URL              | http://localhost:3000/products/:id                           |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | GET                                                          |
| Parameter        | `id: String`                                                 |
| Headers          | `none`                                                       |
| Data             | `none`                                                       |
| Success Response | `status:200`, Data:<br />[<br />    {<br />        "_id": 1,<br />        "name": "Big Fridge",<br />        "description": "One place for save your vegetable",<br />        "stock": 20,<br />        "price": 20000,<br />    }<br />] |
| Error Response   | `status:401`, Data :<br />{<br />     "message": "You are unauthorized"<br /> } |
| Error Response 2 | `status:404`, Data :<br />{<br />    "message": "No data"<br />} |



### Create new product

| URL              | http://localhost:3000/products                               |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | POST                                                         |
| Parameter        | `none`                                                       |
| Headers          | `token: String`                                              |
| Data             | name: String,<br />description: String<br />stock: Number,<br />price: Number |
| Success Response | `status:201`, Data:<br />{<br />    "response": "Product created successfully"<br />} |
| Error Response   | `status:401`, Data :<br />{<br />     "message": "You are unauthorized" <br />} |
| Error Response 2 | `status:500`, Data :<br />{<br />     "message": "Internal server error" <br />} |



### Update Product

| URL              | http://localhost:3000/product/:id                            |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | PATCH                                                        |
| Params           | `id: String`                                                 |
| Headers          | `token: String`                                              |
| Data             | name: String<br />description: String<br />stock: Number<br />price: Number |
| Success Response | `status:200`, Data:<br />{<br />    "response": "Product Updated Successfully" <br />} |
| Error Response   | `status:401`, Data :<br />{<br />    "msg": "You Are Unauthorized"<br /> } |



### Delete Product

| URL              | http://localhost:3000/product/:id                            |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | DELETE                                                       |
| Params           | `id: String`                                                 |
| Headers          | `token: String`                                              |
| Data             | `none`                                                       |
| Success Response | `status:200`, Data:<br />{<br />     "response": "Product Removed Successfully"<br />} |
| Error Response   | `status:401`, Data :<br />{<br />     "msg": "You Are Unauthorized"<br />} |





## /users

| Route          | HTTP | Header(s) | Body                                                         | Description       |
| -------------- | ---- | --------- | ------------------------------------------------------------ | ----------------- |
| /user/register | POST | `none`    | `name: String`,<br />`email: String`,<br />`password: String`,<br />`role: String` | Register new user |
| /user/login    | POST | `none`    | `email: String`, `password: String`                          | Log in old user   |



### Register New User

| URL              | http://localhost:3000/users/register                         |
| ---------------- | ------------------------------------------------------------ |
| Method           | POST                                                         |
| Params           | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `username: String`,<br />`email: String`,<br />`password: String`,<br />`role: String` |
| Success Response | `status: 201` , Data: <br />{<br />   "username": "Admin",<br />   "email": "admin@gmail.com"<br />   "password":"$2a$10$vT.0e3mTW3xqIJsdrR0QmedgHfCSsTOkFVDCmk392M6pl9B0l.QmO"<br />   "role": "admin"<br />} |
| Error Response   | `status:400` , Data:<br />{<br />    "msg": "Incorrect Email / Password"<br />} |



### Login Old User

| URL              | http://localhost:3000/users/login                            |
| ---------------- | ------------------------------------------------------------ |
| Method           | POST                                                         |
| Params           | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `email: String`,<br />`password:string`                      |
| Success Response | `status: 200` , Data:<br />{<br />    "username": "Admin",<br />    "email": "[admin@gmail.com](mailto:admin@gmail.com)"<br />    "password":"$2a$10$vT.0e3mTW3xqIJsdrR0QmedgHfCSsTOkFVDCmk392M6pl9B0l.QmO"<br />   "role": "admin"<br />} |
| Error Response   | `status:400` , Data: {<br />     "msg": "Incorrect Email / Password" <br />} |





## /admins

| Route                 | HTTP   | Header(s)       | Body                                                     | Description        |
| --------------------- | ------ | --------------- | -------------------------------------------------------- | ------------------ |
| /admins/login         | POST   | `token:String`  | `email: String`, `password: String`                      | Log In admins      |
| /admins/addItem       | POST   | `token:String`  | `product_id:String`, `quantity: Number`, `price: Number` | Add Item           |
| /admins/updateItem    | PATCH  | `token:String`  | `product_id:String` `quantity: String`                   | Update Item        |
| /admins/removeItem    | DELETE | `token:String`  | `product_id: String`                                     | Remove item        |
| /superadmins/register | POST   | `token: String` | `username: String`, `email: String`, `password: String`  | Register new admin |





## /transactions

coming soon





## /carts

coming soon





## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

````
$ git clone https://github.com/dipadana/e-commerce.git
$ cd e-commerce
$ npm install
$ npm run dev
```



## Server Link

Access the website via http://localhost:3000