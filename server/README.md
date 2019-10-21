# API Documentation for E-Commerce

## Server Location

Server is located on this URL

```http
https://gamestop-server.andreassosilo.co/
```

## `GET` Server Test

```http
https://gamestop-server.andreassosilo.co/
```

### Success Response

**Response Code**: `200 OK`

```json
{
    page: "Home",
    message: "Connected to E-commerce Apps!"
}
```

## Users Route

|      ROUTE      | HTTP  | HEADERS | BODY | DESCRIPTION | ADDITIONAL |
| :-------------: | :---: | :-----: | :--: | :---------: | :--------: |
|  /users/login   |  GET  |    -    |  -   |    Login    |     -      |
| /users/register | POST  |    -    |  -   |  Register   |     -      |
|  /users/check   | POST  |  token  |      | Check Login |     -      |
|   /users/cart   |  GET  |  token  |      |  Get Cart   |     -      |
|  /users/clear   | POST  |  token  |      | Clear Cart  |     -      |
|   /users/cart   | PATCH |  token  |      | Update Cart |     -      |
|    /checkout    | POST  |  token  |      |  Checkout   |     -      |

## `POST` Login User

### Route

```http
/users/login
```

### Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Body

| Key      | Value  | Remarks          |
| -------- | ------ | ---------------- |
| email    | String | registered email |
| password | String |                  |

### Example

```json
{
    "email": "hana@mail.com",
    "password": "12345"
}
```

### Success Response

**Response Code**: `200 OK`

```json
{
    "username": "hana",
    "email": "hanal@mail.com",
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

## `POST` Register User

### Route

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

```json
{
    "username": "hana",
    "email": "hana@mail.com",
    "password": "12345"
}
```

### Success Response

**Response Code**: `201 Created`

```json
{
    "username": "Hana",
    "email": "hana@mail.com",
    "token": "[token]"
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
        "Username is required",
        "E-mail is required",
        "Password is required",
        "E-mail is already used & registered!",
        "Please insert minimum 8 character for the password",
    ]
}
```

## Products Route

|     ROUTE     |  HTTP  | HEADERS | BODY |   DESCRIPTION    | ADDITIONAL |
| :-----------: | :----: | :-----: | :--: | :--------------: | :--------: |
|  /products/   |  POST  |  token  |  -   |  Create Product  |     -      |
|   /products   |  GET   |  token  |  -   | Get All Products |     -      |
| /products/:id |  GET   |  token  |      | Get One Product  |     -      |
| /products/:id | DELETE |  token  |      |  Delete Product  |     -      |
| /products/:id | PATCH  |  token  |      |  Update Product  |     -      |

|   ROUTE   | HTTP | HEADERS | BODY |   DESCRIPTION    | ADDITIONAL |
| :-------: | :--: | :-----: | :--: | :--------------: | :--------: |
| /products | GET  |  token  |  -   | Get all products |     -      |

Status code: 200 (OK)

Response:

```
[
  {
	name: "Plants vs. Zombies: Battle for Neighborville",
    quantity: 50,
    price: 500000,
    description: "Kick some grass in Plant vs. Zombies: Battle for Neighborville, the wackiest shooter yet! Unearth 20 fully customizable character classes at launch in one social region, three free-roam regions, one Ops mode, six online multiplayer modes, including Battle Arena, and more!",
    image: "http://playstation4.com/games/plant-vs-zombies",
    created_At: 2019-10-03
  }
]
```



|   ROUTE   | HTTP | HEADERS |                             BODY                             |      DESCRIPTION      | ADDITIONAL |
| :-------: | :--: | :-----: | :----------------------------------------------------------: | :-------------------: | :--------: |
| /products | POST |  token  | name:String, price:Number, quantity:Number, description:String, imageName:String, imageUrl:String | Create a new products |            |

Status code: 201 (Created)

Response:

```
[
  {
	name: "Plants vs. Zombies: Battle for Neighborville",
    quantity: 50,
    price: 500000,
    description: "Kick some grass in Plant vs. Zombies: Battle for Neighborville, the wackiest shooter yet! Unearth 20 fully customizable character classes at launch in one social region, three free-roam regions, one Ops mode, six online multiplayer modes, including Battle Arena, and more!",
    image: "http://playstation4.com/games/plant-vs-zombies",
    created_At: 2019-10-03
  }
]
```

Status code: 400 (Bad Request)

Response:

```
{
  message: "Please insert product's name"
}
```



## 