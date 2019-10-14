# API Documentation for E-Commerce

## Users API

|      ROUTE      | HTTP  | HEADERS | BODY | DESCRIPTION | ADDITIONAL |
| :-------------: | :---: | :-----: | :--: | :---------: | :--------: |
|  /users/login   |  GET  |    -    |  -   |    Login    |     -      |
| /users/register | POST  |    -    |  -   |  Register   |     -      |
|  /users/check   | POST  |  token  |      | Check Login |     -      |
|   /users/cart   |  GET  |  token  |      |  Get Cart   |     -      |
|  /users/clear   | POST  |  token  |      | Clear Cart  |     -      |
|   /users/cart   | PATCH |  token  |      | Update Cart |     -      |
|    /checkout    | POST  |  token  |      |  Checkout   |     -      |

### Login

|    ROUTE     | HTTP | HEADERS | BODY | DESCRIPTION | ADDITIONAL |
| :----------: | :--: | :-----: | :--: | :---------: | :--------: |
| /users/login | GET  |    -    |  -   |    Login    |     -      |

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



## Products API

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