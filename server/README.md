# Visual Novel Store API Server

# SERVER INFO

Server request example will be using [Axios]('#'), since it's what the client use.

## Server Location

Server is located on this URL

```http
http://visual-novel-api.crowfx.online/
```

## `GET` Server Test

```http
http://visual-novel-api.crowfx.online/
```

**Request Example**

```js
axios({
    method: 'get',
    url: 'http://visual-novel-api.crowfx.online'
})
.then(({ data }) => { console.log(data) }) // Success Response
.catch(({ response: { data: err }}) => { console.log(err) }) // Error response
```

**Response**: `200 OK`

```json
{
    "message": "Server Test Ok!"
}
```



# USER ROUTE

## `POST` Register User

### URI

```http
/users/register
```

### Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Body

| Key      | Value  | Required |
| -------- | ------ | -------- |
| username | String | Yes      |
| email    | String | Yes      |
| password | String | Yes      |

### Example

```js
const body = {
    "username": "Gabriel",
    "email": "gabriel@email.com",
    "password": "12345"
}

axios({
    method: 'post',
    url: 'http://visual-novel-api.crowfx.online/users/register',
    data: body
})
.then(({ data }) => { console.log(data) }) // Success Response
.catch(({ response: { data: err }}) => { console.log(err) }) // Error response
```

### Success Response

**Response Code**: `201 Created`

```json
{
    "username": "Gabriel",
    "email": "gabriel@email.com",
    "token": "Bearer [token]"
}
```

### Fail Response

#### Error Validation

Message Error appears depending on the user's request body. This one denotes all possibilities.

**Response Code**: `400 Bad Request`

```json
{
    "code": 400,
    "message": [
        "Username required",
        "Email required",
        "Password required",
        "Username is already taken",
        "Invalid Email Format",
        "Email is already taken"
    ]
}
```

## `POST` Login User

### URI

```http
/users/login
```

### Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Body

| Key      | Value  | Remarks                                          |
| -------- | ------ | ------------------------------------------------ |
| identity | String | Identity is either registered email or username. |
| password | String |                                                  |

### Example

```js
const body = {
    "identity": "Gabriel",
    "password": "12345"
}

axios({
    method: 'post',
    url: 'http://visual-novel-api.crowfx.online/users/login',
    data: body
})
.then(({ data }) => { console.log(data) }) // Success Response
.catch(({ response: { data: err } }) => { console.log(err) }) // Error response
```

### Success Response

Cart in the response body depends whether logged on user previously has added items to the cart or not.

**Response Code**: `200 OK`

```json
{
    "username": "Gabriel",
    "email": "gabriel@email.com",
    "token": "Bearer [token]"
}
```

### Fail Response

#### Wrong Username / Email / Password

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Wrong Username / Email / Password"
}
```

## `GET` Verify User

**Authentication Required**

### URI

```http
/users/verify
```

### Headers

| Key           | Value  |
| ------------- | ------ |
| Authorization | String |

### Example

**Headers**

```json
{
	"Authorization": "Bearer [Token]"
}
```

### Success Response

**Response Code**: `200 OK`

```json
{
    "code": 200,
    "message": "User verified"
}
```

### Fail Response

#### Token Malformed

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token malformed or expired. Please relogin to get new Token"
}
```

#### Token Not Set

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token not set for this request"
}
```

## `GET` USERS

**Authentication & Authorization Required**: Only admins can get users

### URI

```http
/users
```

### Headers

| Key           | Value  |
| ------------- | ------ |
| Authorization | String |

### Example

**Headers**

```json
{
	"Authorization": "Bearer [Token]"
}
```

### Success Response

**Response Code**: `200 OK`

```json
[
    {
        "_id": "[userId]",
        "username": "[user]",
        "email": "[useremail]",
        "cart": [
            // User cart
        ],
        "transactions": [
            // Transaction IDs
        ]
    },
    {
        "_id": "[userId]",
        "username": "[user]",
        "email": "[useremail]",
        "cart": [
            // User cart
        ],
        "transactions": [
            // Transaction IDs
        ]
    }
]
```

### Fail Response

#### Token Malformed

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token malformed or expired. Please relogin to get new Token"
}
```

#### Token Not Set

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token not set for this request"
}
```

## `POST` Register as Admin

### URI

```http
/users/admin
```

### Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Body

| Key        | Value  | Required |
| ---------- | ------ | -------- |
| username   | String | Yes      |
| email      | String | Yes      |
| password   | String | Yes      |
| SECRET_KEY | String | Yes      |

### Success Response

**Response Code**: `201 Created`

```json
{
    "username": "Gabriel",
    "email": "gabriel@email.com",
    "token": "Bearer [token]"
}
```

### Fail Response

#### Error Validation

Message Error appears depending on the user's request body. This one denotes all possibilities.

**Response Code**: `400 Bad Request`

```json
{
    "code": 400,
    "message": [
        "Username required",
        "Email required",
        "Password required",
        "Username is already taken",
        "Invalid Email Format",
        "Email is already taken"
    ]
}
```

#### SECRET_KEY Error

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "SECRET_KEY does not match"
}
```

## 

# CART ROUTE

**Authentication Required**

## `GET` User Cart

### URI

```http
/carts
```

### Headers

| Key           | Value          |
| ------------- | -------------- |
| Authorization | Bearer [Token] |

### Success Response

```json
{
    "cart": [
        //items here
    ]
}
```

### Error Response

#### Token Malformed

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token malformed or expired. Please relogin to get new Token"
}
```

#### Token Not Set

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token not set for this request"
}
```

## `POST` Add Item to Cart

### URI

```http
/carts
```

### Headers

| Key           | Value            |
| ------------- | ---------------- |
| Content-Type  | application/json |
| Authorization | Bearer [Token]   |

### Body

| Key      | Value  | Required | Remarks    |
| -------- | ------ | -------- | ---------- |
| id       | String | Yes      | Product ID |
| quantity | Number | Yes      |            |

### Example

```json
{
	"id": "[productId]",
    "quantity": 10
}
```

### Success Response

**Response Code: `200 OK`**

```json
{
    "cart": [
        {
            "product": {
                "_id": "[productId]",
            	"productName": "[productName]",
            	"image": "[imageURL]",
            	"price": 10000, // Product Price
                "stock": 100 // Product Stock
            },
            "quantity": 10
        }
    ]
}
```

### Fail Response

#### Not Found Error

**Response Code: `404 Not Found`**

```json
{
    "code": 404,
    "message": "There's no product with such id"
}
```

#### Validation Error

**Response Code: `400 Bad Request`**

```json
{
    "code": 400,
    "message": [
        "Product id must be set",
        "Buy amount must be set"
    ]
}
```

#### Logic Error - Set 0 or negative Buy Amount

**Response Code: `400 Bad Request`**

```json
{
    "code": 400,
    "message": "You cannot buy a product with 0 stock"
}
```

#### Logic Error - Buy above stock amount

**Response Code: `400 Bad Request`**

```json
{
    "code": 400,
    "message": "You cannot buy a product higher than the stock have"
}
```

#### Logic Error - Adding a product with 0 stock

**Response Code: `400 Bad Request`**

```json
{
    "code": 400,
    "message": "You cannot add a product with empty stock"
}
```

#### Token Malformed

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token malformed or expired. Please relogin to get new Token"
}
```

#### Token Not Set

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token not set for this request"
}
```

## `PATCH` Remove Item in Cart

### URI

```http
/carts/:id
```

### PARAMS

| Key  | Value  |
| ---- | ------ |
| id   | String |

### Headers

| Key           | Value          |
| ------------- | -------------- |
| Authorization | Bearer [Token] |

### Example

```http
/carts/[productId]
```

### Success Response

**Response Code: `200 OK`**

```json
{
    "cart": [
        //items here
    ]
}
```

### Error Response

#### Not Found Error - Cart

**Response Code: `404 Not Found`**

```json
{
    "code": 404,
    "message": "There's no product with such id in your cart"
}
```

#### Token Malformed

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token malformed or expired. Please relogin to get new Token"
}
```

#### Token Not Set

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token not set for this request"
}
```

## `PUT` Edit Items in Cart

**WARNING**: Editing Items in Cart replaces whole cart. If simply adding or delete items, please use POST or PATCH

### URI

```http
/carts
```

**Method: `PUT`**

### Headers

| Key           | Value            |
| ------------- | ---------------- |
| Content-Type  | application/json |
| Authorization | Bearer [Token]   |

### Body

| Key      | Value  | Required |
| -------- | ------ | -------- |
| id       | String | Yes      |
| quantity | Number | Yes      |

### Example

```json
[
    {
	"id": "[productId]",
    "quantity": 10
	},
    {
	"id": "[productId]",
    "quantity": 5
	},
    {
	"id": "[productId]",
    "quantity": 1
	}
]
```

### Success Response

**Response Code: `200 OK`**

```json
{
    "cart": [
        {
            "product": {
                "_id": "[productId]",
            	"productName": "[productName]",
            	"image": "[imageURL]",
            	"price": 10000, // Product Price
                "stock": 100, // Product Stock
            },
            "quantity": 10
        },
        {
            "product": {
                "_id": "[productId]",
            	"productName": "[productName]",
            	"image": "[imageURL]",
            	"price": 10000, // Product Price
                "stock": 100, // Product Stock
            },
            "quantity": 5
        },
        {
            "product": {
                "_id": "[productId]",
            	"productName": "[productName]",
            	"image": "[imageURL]",
            	"price": 10000, // Product Price
                "stock": 100, // Product Stock
            },
            "quantity": 1
        }
    ] 
}
```

### Fail Response

#### Validation Error

**Response Code: `400 Bad Request`**

```json
{
    "code": 400,
    "message": [
        "Product id must be set",
        "Buy amount must be set"
    ]
}
```

#### Logic Error - Set 0 or negative Buy Amount

**Response Code: `400 Bad Request`**

```json
{
    "code": 400,
    "message": "You cannot buy a product with 0 or lower amount"
}
```

#### Logic Error - Buy above stock amount

**Response Code: `400 Bad Request`**

```json
{
    "code": 400,
    "message": "You cannot buy a product higher than the stock have"
}
```

#### Logic Error - Adding a product with 0 stock

**Response Code: `400 Bad Request`**

```json
{
    "code": 400,
    "message": "You cannot add a product with empty stock"
}
```

#### Token Malformed

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token malformed or expired. Please relogin to get new Token"
}
```

#### Token Not Set

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token not set for this request"
}
```

## `DELETE` Cart

### URI

```http
/carts
```

### Headers

| Key           | Value          |
| ------------- | -------------- |
| Authorization | Bearer [Token] |

### Example

```http
/carts
```

### Success Response

**Response Code: `200 OK`**

```json
{
    "message": "Cart deleted"
}
```

#### Token Malformed

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token malformed or expired. Please relogin to get new Token"
}
```

#### Token Not Set

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token not set for this request"
}
```

# PRODUCT ROUTE

**Authentication and Authorization Required**: Only admins can handle product

## `POST` Add New Product



# TRANSACTION ROUTE

**Authentication Required**

**Authorization Required**: Only Admin and owner of transaction has access for requests.

## `GET` User Transaction

### URI

```http
/transactions
```

### Headers

| Key           | Value          |
| ------------- | -------------- |
| Authorization | Bearer [Token] |

### Success Response

```json
{
    "transactions": [
        //items here
    ]
}
```

### Error Response

#### Token Malformed

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token malformed or expired. Please relogin to get new Token"
}
```

#### Token Not Set

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token not set for this request"
}
```

## `GET` Add Transaction

### URI

```http
/transactions/add
```

### Headers

| Key           | Value          |
| ------------- | -------------- |
| Authorization | Bearer [Token] |

### Success Response

```json
{
    "transactions": [
        [
            {
            "product": {
                "_id": "[productId]",
            	"productName": "[productName]",
            	"image": "[imageURL]",
            	"price": 10000, // Product Price
                "stock": 100, // Product Stock
            },
            "quantity": 10
       		}
        ]
    ]
}
```

### Error Response

#### Token Malformed

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token malformed or expired. Please relogin to get new Token"
}
```

#### Token Not Set

**Response Code**: `401 Unauthorized`

```json
{
    "code": 401,
    "message": "Token not set for this request"
}
```

## 