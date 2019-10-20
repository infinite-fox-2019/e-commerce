## API DOCUMENTATION

# <span style="color:green">E-Commerce DieCast CityCar to HyperCar HDCT (Hope Dreams Come True)

---
Simple E-Commerce app with Authentication and Authorization.<br>
use express,mongoose,Json Web Token for server side.<br>
use VueJs,bostrap for Client side

|Route|HTTP Method|Description|
|:----|:-----|:----|
|/register|POST|Route used to Create new Account|
|/login|POST|Route used to Login User|
|/products|GET|Route used to Get All Product|
|/products|POST|Route used to Create new Product|
|/products|PUT|Route used to Edit Product|
|/products|DELETE|Route used to Delete Product|
|/brands|GET|Route used to Get All Brand|
|/cart|GET|Route used to Get All cart|
|/cart|POST|Route used to Create cart|
|/cart|PATCH|Route used to Update cart|
|/cart|DELETE|Route used to Delete cart|
|/transactions|GET|Route used to Get Transaction|
|/transactions|POST|Route used to Create Transaction|

---
**Register**
---
 Register new account to the database and returns a json response if succeeded.
* **URL**
 /register
* **Method:**
 POST
* **URL Params**
 None required
* **Body**
```javascript
{
    "_id" : ObjectId,
    "username" : String,
    "password" : String,
    "email" : String,
    "role" : String,
    "address" : String
}
 ```
* **Success Response:**
```javascript
{
    "status" : 201,
    "msg" : "Account successfully registered"
}
```
* **Error Response:**
```javascript
{
    "status" : 500,
    "msg" : "Internal Server Error"
}
```

---
**Login**
----
 Login to the database and returns a token if succeeded.
* **URL**
 /login
* **Method:**
 POST
* **URL Params**
 None required
* **Body**
```javascript
{
    "email" : String,
    "password" : String
}
 ```
* **Success Response:**
```javascript
{
    "token" : String
}
```
* **Error Response:**
```javascript
{
    "status" : 500,
    "msg" : "Internal Server Error"
}
```

---
**GET Product**
----
* **URL**
 /products
* **Method:**
 GET
* **URL Params**
 None required
* **Body**
 None required
* **Success Response:**
```javascript
[
    {
        "_id": ObjectId,
        "name": String",
        "price": Number,
        "description": String,
        "image": Url-Link,
        "brand": String,
        "createdAt": Date,
        "stock": Number,
        "__v": 0
    },
    {...},
    {...},
    {...}
]
```
* **Error Response:**
```javascript
{
    "status" : 500,
    "msg" : "Internal Server Error"
}
```

---
**POST Product**
----
* **URL**
 /products
* **Method:**
 POST
* **URL Params**
 None 
* **Headers**
```javascript
{
    "token" : String
}
```
* **Role** Admin Only
* **Body**
```javascript
{
    "name" : String,
    "brand" : String,
    "description" : String,
    "stock" : Number,
    "price" : Number,
    "image" : File
}
 ```
* **Success Response:**
```javascript
{
    "msg" : "Success Create"
}
```
* **Error Response:**
```javascript
{
    "status" : 500,
    "msg" : "Internal Server Error"
}
```
---
**PUT Product**
----
* **URL**
 /products
* **Method:**
 PUT
* **URL Params**
/:id
* **Headers**
```javascript
{
    "token" : String
}
```
* **Role** Admin Only
* **Body**
```javascript
{
    "name" : String,
    "brand" : String,
    "description" : String,
    "stock" : Number,
    "price" : Number,
    "image" : File
}
 ```
* **Success Response:**
```javascript
{
    "msg" : "Success Update"
}
```
* **Error Response:**
```javascript
{
    "status" : 500,
    "msg" : "Internal Server Error"
}
```
---
**DELETE Product**
----
* **URL**
 /products
* **Method:**
 DELETE
* **URL Params**
/:id
* **Headers**
```javascript
{
    "token" : String
}
```
* **Role** Admin Only
* **Body**
 None Required
* **Success Response:**
```javascript
{
    "msg" : "Success Delete"
}
```
* **Error Response:**
```javascript
{
    "status" : 500,
    "msg" : "Internal Server Error"
}
```
---
**GET Brands**
---
* **URL**
 /brands
* **Method:**
 GET
* **URL Params**
 None required
* **Body**
 None required
* **Success Response:**
```javascript
{
    "_id" : ObjectId,
    "name" : String
}
```
* **Error Response:**
```javascript
{
    "status" : 500,
    "msg" : "Internal Server Error"
}
```
---
**GET Cart**
---
* **URL**
 /cart
* **Method:**
 GET
* **URL Params**
 None required
* **Headers**
```javascript
{
    "token" : String
}
```
* **Body**
 None required
* **Success Response:**
```javascript
{
    "_id" : ObjectId,
    "UserId" : String,
    "product" : Array of { ObjectId, qty }
}
```
* **Error Response:**
```javascript
{
    "status" : 500,
    "msg" : "Internal Server Error"
}
```
---
**DELETE Cart**
---
* **URL**
 /cart
* **Method:**
 DELETE
* **URL Params**
 /:id
* **Headers**
```javascript
{
    "token" : String
}
```
* **Body**
 None required
* **Success Response:**
```javascript
{
    "status" : 200,
    "msg" : "Cart Deleted!"
}
```
* **Error Response:**
```javascript
{
    "status" : 500,
    "msg" : "Internal Server Error"
}
```
/transactions	GET	Route used to Get Transaction
/transactions	POST	Route used to Create Transaction
/upload	POST	Route used to Upload Image

---
**GET Transaction**
---
* **URL**
 /transactions
* **Method:**
 GET
* **URL Params** None required
* **Headers**
```javascript
{
    "token" : String
}
```
* **Body**
 None required
* **Success Response:**
```javascript
{
    "_id" : ObjectId,
    "CartId" : ObjectId
}
```
* **Error Response:**
```javascript
{
    "status" : 500,
    "msg" : "Internal Server Error"
}
```

---
**POST Transaction**
---
* **URL**
 /transactions
* **Method:**
 POST
* **URL Params** None required
* **Headers**
```javascript
{
    "token" : String
}
```
* **Body**
```javascript
{
    "CartId" : String
}
```
* **Success Response:**
```javascript
{
    "msg" : "Success Transaction"
```
* **Error Response:**
```javascript
{
    "status" : 500,
    "msg" : "Internal Server Error"
}
```
