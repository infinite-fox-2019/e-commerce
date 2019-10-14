# E-Commerce

## API Documentation

### List of Product Routes:

| Route        | HTTP   | Header(s) | Body                                                         | Description        |
| ------------ | ------ | --------- | ------------------------------------------------------------ | ------------------ |
| /product     | GET    | `none`    | `none`                                                       | Get All Products   |
| /product/:id | GET    | `none`    | `none`                                                       | Get One Product    |
| /product     | POST   | `token`   | `name: String`,<br />`description: String`,<br />`stock: Number`,<br />`price: Number` | Create New Product |
| /product/:id | PATCH  | `token`   | `name: String`,<br />`description: String`,<br />`stock: Number`,<br />`price: Number` | Update Product     |
| /product/:id | DELETE | `token`   | `none`                                                       | Delete Product     |

### Get All Products

| URL              | http://localhost:3000/product                                |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | GET                                                          |
| Params           | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `none`                                                       |
| Success Response | `status: 200`, Data:<br />[<br />    {<br />        "_id": 1,<br />        "name": "Black Mug",<br />        "description": "A Black Mug For All Your Needs",<br />        "stock": 200,<br />        "price": 20 000,<br />    }<br />] |
| Error Response   | `status: 401`, Data :<br />{<br />    "msg": "You Are Unauthorized"<br />} |

### Get One Product

| URL              | http://localhost:3000/product/:id                            |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | GET                                                          |
| Params           | `id: String`                                                 |
| Headers          | `none`                                                       |
| Data             | `none`                                                       |
| Success Response | `status: 200`, Data:<br />{<br />    "_id": 1,<br />    "name": "Black Mug",<br />    "description": "A Black Mug For All Your Needs",<br />    "stock": 200,<br />    "price": 20 000,<br />} |
| Error Response   | `status: 401`, Data :<br />{<br />     "msg": "You Are Unauthorized"<br /> } |
| Error Response 2 | `status: 404`, Data:<br />{<br />    "msg": "Product Not Found"<br />} |

### Create New Product

| URL              | http://localhost:3000/product                                |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | POST                                                         |
| Params           | `none`                                                       |
| Headers          | `token: String`                                              |
| Data             | name: String,<br />description: String<br />stock: Number,<br />price: Number |
| Success Response | `status: 201`, Data:<br />{<br />    "response": "Product Created Successfully"<br />} |
| Error Response   | `status: 401`, Data :<br />{<br />     "msg": "You Are Unauthorized" <br />} |

### Update Product

| URL              | http://localhost:3000/product/:id                            |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | PATCH                                                        |
| Params           | `id: String`                                                 |
| Headers          | `token: String`                                              |
| Data             | name: String<br />description: String<br />stock: Number<br />price: Number |
| Success Response | `status: 200`, Data:<br />{<br />    "response": "Product Updated Successfully" <br />} |
| Error Response   | `status: 401`, Data :<br />{<br />    "msg": "You Are Unauthorized"<br /> } |

### Delete Product

| URL              | http://localhost:3000/product/:id                            |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | DELETE                                                       |
| Params           | `id: String`                                                 |
| Headers          | `token: String`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200`, Data:<br />{<br />     "response": "Product Removed Successfully"<br />} |
| Error Response   | `status: 401`, Data :<br />{<br />     "msg": "You Are Unauthorized"<br />} |

### List Of Cart Routes:

| Route             | HTTP   | Header(s)       | Body               | Description      |
| ----------------- | ------ | --------------- | ------------------ | ---------------- |
| /cart/:product_id | POST   | `token: String` | `quantity: String` | Add To Cart      |
| /cart/:product_id | PATCH  | `token: String` | `quantity: String` | Update Quantity  |
| /cart/:product_id | DELETE | `token: String` | `none`             | Remove From Cart |

### Add To Cart

| URL              | http://localhost:3000/cart/:product_id                       |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | POST                                                         |
| Params           | `product_id: String`                                         |
| Headers          | `token: String`                                              |
| Data             | `quantity: String`                                           |
| Success Response | `status: 201`, Data:<br />{<br />      "response": "Item Added To Cart Successfully"<br />} |
| Error Response   | `status: 401`, Data :<br />{<br />      "msg": "You Are Unauthorized"<br />} |

### Update Quantity

| URL              | http://localhost:3000/cart/:product_id                       |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | PATCH                                                        |
| Params           | `product_id: String`                                         |
| Headers          | `token: String`                                              |
| Data             | `quantity: String`                                           |
| Success Response | `status: 200`, Data:<br />{<br />       "response": "Item Updated Successfully"<br />} |
| Error Response   | `status: 401`, Data :<br />{<br />       "msg": "You Are Unauthorized"<br />} |

### Remove From Cart

| URL              | http://localhost:3000/cart/:product_id                       |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | DELETE                                                       |
| Params           | `product_id: String`                                         |
| Headers          | `token: String`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200`, Data:<br />{<br />       "response": "Item Removed Successfully"<br />} |
| Error Response   | `status: 401`, Data :<br />{<br />       "msg": "You Are Unauthorized" <br />} |

### List Of Transaction Routes:

| Route                    | HTTP   | Header(s)       | Body               | Description        |
| ------------------------ | ------ | --------------- | ------------------ | ------------------ |
| /transaction/:product_id | POST   | `token: String` | `quantity: String` | Create Transaction |
| /transaction/:product_id | DELETE | `token: String` | `none`             | Delete Transaction |

### Create Transaction

| URL              | http://localhost:3000/transaction/:product_id                |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | POST                                                         |
| Params           | `product_id: String`                                         |
| Headers          | `token: String`                                              |
| Data             | `quantity: String`                                           |
| Success Response | `status: 201`, Data:<br />{<br />       "response": "Item Added To Transaction Successfully"<br />} |
| Error Response   | `status: 401`, Data :<br />{<br />       "msg": "You Are Unauthorized"<br />} |

### Delete Transaction

| URL              | http://localhost:3000/transaction/:product_id                |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | DELETE                                                       |
| Params           | `product_id: String`                                         |
| Headers          | `token: String`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 201`, Data:<br />{<br />       "response": "Item Removed From Transaction Successfully"<br />} |
| Error Response   | `status: 401`, Data :<br />{<br />       "msg": "You Are Unauthorized"<br />} |

### List Of User Routes:

| Route          | HTTP | Header(s) | Body                                                         | Description       |
| -------------- | ---- | --------- | ------------------------------------------------------------ | ----------------- |
| /user/register | POST | `none`    | `username: String`,<br />`email: String`,<br />`password: String` | Register New User |
| /user/login    | POST | `none`    | `email: String`, `password: String`                          | Log In Old User   |

### Register New User

| URL              | http://localhost:3000/user/register                          |
| ---------------- | ------------------------------------------------------------ |
| Method           | POST                                                         |
| Params           | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `username: String`,<br />`email: String`,<br />`password: String` |
| Success Response | `status: 201` , Data: <br />{<br />   "username": "Jeff",<br />   "email": "jeff@gmail.com"<br />   "token":"$2a$10$vT.0e3mTW3xqIJsdrR0QmedgHfCSsTOkFVDCmk392M6pl9B0l.QmO"<br />   "role": "customer"<br />} |
| Error Response   | `status: 400`, Data:<br />{<br />    "msg": "Username Is Already Taken"<br />} |

### Login User

| URL              | http://localhost:3000/user/login                             |
| ---------------- | ------------------------------------------------------------ |
| Method           | POST                                                         |
| Params           | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `email: String`,<br />`password:string`                      |
| Success Response | `status: 200` , Data:<br />{<br />    "username": "Admin",<br />    "email": "[admin@gmail.com](mailto:admin@gmail.com)"<br />    "token":"$2a$10$vT.0e3mTW3xqIJsdrR0QmedgHfCSsTOkFVDCmk392M6pl9B0l.QmO"<br />   "role": "admin"<br />} |
| Error Response   | `status:400` , Data:<br />{<br />     "msg": "Incorrect Email / Password" <br />} |

### List Of Superuser Routes:

| Route          | HTTP   | Header(s)       | Body                                                         | Description        |
| -------------- | ------ | --------------- | ------------------------------------------------------------ | ------------------ |
| /superuser     | POST   | `token: String` | `username: String`<br />`email: String`<br />`password: String` | Register New Admin |
| /superuser/:id | DELETE | `token: String` | `none`                                                       | Remove Admin       |

###  Register Admin

| URL              | http://localhost:3000/superuser                              |
| ---------------- | ------------------------------------------------------------ |
| Method           | POST                                                         |
| Params           | `none`                                                       |
| Headers          | `token: String`                                              |
| Data             | `username: String`<br />`email: String`<br />`password: String` |
| Success Response | `status: 201` , Data:<br />{<br />     "response": "Admin Registered Successfully"<br />} |
| Error Response   | `status:400` , Data:<br />{<br />      "msg": "You Are Unauthorized"<br />} |

### Remove Admin

| URL              | http://localhost:3000/superuser/:id                          |
| ---------------- | ------------------------------------------------------------ |
| Method           | DELETE                                                       |
| Params           | `id: String`                                                 |
| Headers          | `token: String`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , Data:<br />{<br />     "response": "Admin Removed Successfully"<br />} |
| Error Response   | `status:400` , Data:<br />{<br />      "msg": "You Are Unauthorized"<br />} |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ git clone https://github.com/AudrickOng/e-commerce.git
$ cd e-commerce
$ npm install
$ npm run dev
```

## Server Link

Access the website via http://localhost:3000


