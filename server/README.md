# e-commerce

## Deploy
**Client** http://artzone.ayusudi.com  
**Server** http://35.247.174.135

# Routes List

## env.tempalte
CLOUD_BUCKET=
GCLOUD_PROJECT=
KEYFILE_PATH=
PVKEY=
GOOGLE_CLIENT_ID=
ATLAS=

## User
| HTTP  | Routes             | Headers | Body                           | Description                   | 
| --    | ---------          | ----    | -----                          | -----                         |
| POST  | /users             | none    | name, address, email, password | Create user                   |
| POST  | /users/login       | none    | email, password                | Login user                    |
| PATCH | /users/add/:id     | token   |                                | Add item to cart              |
| PATCH | /users/remove/:id  | token   |                                | Remove item in cart           |

## Items
| HTTP   | Routes          | Headers | Body                            | Description                    | 
| --     | ---------       | ----    | -----                           | -----                          |
| POST   | /items          | token   | name, description, tag(array),  | Create item to sell            |
|        |                 |         | featured_image, stock, price    |                                |
| DELETE | /items/:id      | token   |                                 | Delete item                    |
| GET    | /items          | none    |                                 | Get all items                  |
| GET    | /items/tag/:tag | none    |                                 | Get items by tag               |
| GET    | /items/:id      | none    |                                 | Get one item by id             |
| PATCH  | /items/stock    | token   | add, _id                        | Update Stock(increase/decrease)|
| PUT    | /items/:id      | token   | name, description, tag(array),  | Update all info                |
|        |                 |         | featured_image, stock, price    |                                |

## Transaction
| HTTP  | Routes                       | Headers | Body             | Description                        | 
| --    | -------------                | ----    | -----            | -----                              |
| POST  | /transactions/               | token   |                  | Create transaction                 |
| PATCH | /transactions/delivery/:id   | token   | status           | Change deliveryStatus              |
| PATCH | /transactions/cancel/:id     | token   |                  | Change trxStatus                   |
| POST  | /transactions/income         | token   | deliveryStatus   | Get Transactions by deliveryStatus |


# Detail
baseUrl : 'http://35.247.174.135'
## User
### Register
- HTTP : 'post'
- Url : '/users'
- Status : **201**
```
Data : 
{
    "name": "ayu",
    "email": "ayusudi@gmail.com",
    "address": "home home home"
    "password": "12345678"
}
```
```
Response : 
{
    "name": "ayu",
    "email": "ayusudi@gmail.com",
    "address": "home home home",
    "password": "$2a$10$T6Sj9Eucx.QXZuCpWJlvnukeTi/K.R04.wbq6VX9j9grbGxuuFWmu",
    "role": "customer",
    "cart": [],
    "history": [],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFkMmUzMGI3MjdiNTBlMDNlNzYyNDEiLCJlbWFpbCI6ImF5dXN1ZGlAZ21haWwuY29tIiwiaWF0IjoxNTcxNjMwNjQwfQ.YkPeXxObkNdQ7aYS-SSfdM6F6k6i5eoIVsKjbD54gR0"
}
```
### Login 
- HTTP : 'post'
- Url : '/users/login'
- Status : **200**
```
Data : 
{
    "email": "ayusudi@gmail.com",
    "password": "12345678"
}
```
```
Response : 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFkMmUzMGI3MjdiNTBlMDNlNzYyNDEiLCJlbWFpbCI6ImF5dXN1ZGlAZ21haWwuY29tIiwiaWF0IjoxNTcxNjMwNjk0fQ._xOH0vOx5lpUYJv0ELgDDLQA349jZbSCpBmCWq3Q2Hk",
    "name": "ayu",
    "address": "home home home",
    "email": "ayusudi@gmail.com",
    "role": "customer",
    "cart": [],
    "history": []
}
```
### Add Cart 
- HTTP : 'patch'
- Url : '/users/add/:id'
- Status : **200**
- Authentication
```
Headers : 
{
    token : **token**
}
```
```
Response : 
{
    "cart": [
        {
            "_id": "5dad26dab727b50e03e76232",
            "name": "Faber Castle Kit 1",
            "featured_image": "https://storage.googleapis.com/upload-for-ecommerce/1571628762168fabercastel.jpg",
            "price": 540000
        }
    ]
}
```
### Remove Cart 
- HTTP : 'patch'
- Url : '/users/remove/:id'
- Status : **200**
- Authentication
```
Headers : 
{
    token : **token**
}
```
```
Response : 
{
    "cart": []
}
```

## Items
### Add Item to Sell
- HTTP : 'post'
- Url : '/items/'
- Status : **200**
- Authorize Admin
```
Headers : 
{
    token : **token**
}
```
```
Data : 
{
    name : 'Van Gogh',
    description: 'for best quality paint',
    featured_image : 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
    tags : ['bestseller', 'profesional],
    stock : 6,
    price : '160000'
}
```
```
Response : 
{
    "tags": [
        "bestseller",
        "profesional"
    ],
    "_id": "5dad300bb727b50e03e76243",
    "name": "Van Gogh",
    "featured_image": "https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg",
    "description": "for best quality paint",
    "stock": 6,
    "price": 600000,
    "createdAt": "2019-10-21T04:11:55.018Z",
    "updatedAt": "2019-10-21T04:11:55.018Z"
}
```

## Delete Item 
- HTTP : 'delete'
- Url : '/items/:id'
- Status : **200**
- Authorize Admin
```
Headers : 
{
    token : **token**
}
```
```
Response : 
{
    message : 'Success Delete Item **item name** '
}
```

## Get All Items
- HTTP : 'get'
- Url : '/items'
- Status : **200**
```
Response :
[
    {
        "tags": [
            "bestseller",
            "profesional"
        ],
        "_id": "5dad300bb727b50e03e76243",
        "name": "Van Gogh",
        "featured_image": "https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg",
        "description": "for best quality paint",
        "stock": 6,
        "price": 600000,
        "createdAt": "2019-10-21T04:11:55.018Z",
        "updatedAt": "2019-10-21T04:11:55.018Z"
    },..
```

## Get One Item
- HTTP : 'get'
- Url : '/items/:id'
- Status : **200**
```
Response :
{
    "tags": [
        "bestseller",
        "profesional"
    ],
    "_id": "5dad300bb727b50e03e76243",
    "name": "Van Gogh",
    "featured_image": "https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg",
    "description": "for best quality paint",
    "stock": 6,
    "price": 600000,
    "createdAt": "2019-10-21T04:11:55.018Z",
    "updatedAt": "2019-10-21T04:11:55.018Z"
}
```

## Set Stock
- HTTP : 'patch'
- Url : '/items/stock'
- Status : **200**
- Authorize Admin
```
Headers : 
{
    token : **token**
}
```
```
Data : 
{
  _id: 5dad300bb727b50e03e76243,
  add: 2
}
```
```
Response : 
{
    "name": "Van Gogh",
    "stock": 8
}
```

## Update Item
- HTTP : 'pup'
- Url : '/items/:id'
- Status : **200**
- Authorize Admin
```
Headers : 
{
    token : **token**
}
```
```
Data : 
{
    name : 'Paint Van Gogh',
    description: 'for best quality paint',
    featured_image : 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
    tags : ['profesional', 'paint', 'bestseller'],
    stock : 20,
    price : '700000'
}
```
```
Response : 
{
    "message": "Success Update"
}
```

## Get Items By Tag
- HTTP : 'get'
- Url : '/items/tag/:tag'
- Status : **200**
- example tag is bestseller
```
Response :
[
    {
        "tags": [
            "bestseller",
            "profesional",
            "paint"
        ],
        "_id": "5dad300bb727b50e03e76243",
        "name": "Paint Van Gogh",
        "featured_image": "https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg",
        "description": "for best quality paint",
        "stock": 2,
        "price": 700000,
        "createdAt": "2019-10-21T04:11:55.018Z",
        "updatedAt": "2019-10-21T04:22:26.671Z"
    },
    {
        "tags": [
            "kids",
            "bestseller"
        ],
        "_id": "5dad29a2b727b50e03e7623f",
        "name": "Spirograph Ruler",
        "featured_image": "https://storage.googleapis.com/upload-for-ecommerce/1571629474291rulerkids.jpeg",
        "description": "cool item",
        "stock": 55,
        "price": 12000,
        "createdAt": "2019-10-21T03:44:34.879Z",
        "updatedAt": "2019-10-21T03:44:34.879Z"
    },..
]
```

## Transaction
### Create Transactions 
- HTTP : 'post'
- Url : '/transactions'
- Status : **201**
- Authentication
```
Headers : 
{
    token : **token**
}
```
```
Response : 
{
    "trx": {
        "listItem": [
            {
                "_id": "5dad26dab727b50e03e76232",
                "name": "Faber Castle Kit 1",
                "featured_image": "https://storage.googleapis.com/upload-for-ecommerce/1571628762168fabercastel.jpg",
                "price": 540000,
                "sum": 540000,
                "quantity": 1
            }
        ],
        "deliveryStatus": false,
        "statusTrx": true,
        "_id": "5dad349cb727b50e03e76244",
        "user": "5dad2e30b727b50e03e76241",
        "createdAt": "2019-10-21T04:31:24.291Z",
        "updatedAt": "2019-10-21T04:31:24.291Z",
        "totalPayment": 540000,
        "totalItem": 1
    },
    "user": {
        "role": "customer",
        "cart": [],
        "history": [
            {
                "listItem": [
                    {
                        "_id": "5dad26dab727b50e03e76232",
                        "name": "Faber Castle Kit 1",
                        "featured_image": "https://storage.googleapis.com/upload-for-ecommerce/1571628762168fabercastel.jpg",
                        "price": 540000,
                        "sum": 540000,
                        "quantity": 1
                    }
                ],
                "deliveryStatus": false,
                "statusTrx": true,
                "_id": "5dad349cb727b50e03e76244",
                "user": "5dad2e30b727b50e03e76241",
                "createdAt": "2019-10-21T04:31:24.291Z",
                "updatedAt": "2019-10-21T04:31:24.291Z",
                "totalPayment": 540000,
                "totalItem": 1
            }
        ],
        "_id": "5dad2e30b727b50e03e76241",
        "name": "ayu",
        "email": "ayusudi@gmail.com",
        "address": "home home home",
        "password": "$2a$10$T6Sj9Eucx.QXZuCpWJlvnukeTi/K.R04.wbq6VX9j9grbGxuuFWmu",
        "createdAt": "2019-10-21T04:04:00.322Z",
        "updatedAt": "2019-10-21T04:31:24.528Z"
    }
}
```
### Edit Delivery Status 
- HTTP : 'patch'
- Url : '/transactions/delivery/:id'
- Status : **200**
- Authentication
```
Headers : 
{
    token : **token**
}
```
```
Data : 
{
  status : true
}
```
```
Response : 
{
    "message": "Thank you for purchasing with us"
}
```
### Cancel Transaction
- HTTP : 'patch'
- Url : '/transactions/cancel/:id'
- Status : **200**
- Authentication
```
Headers : 
{
    token : **token**
}
```
```
Response : 
{
    "message": "Cancelation will be full process less in 24 hours"
}
```

### Get Transactions
- HTTP : 'patch'
- Url : '/transactions/income'
- Status : **200**
- Authorization Admin
```
Headers : 
{
    token : **token**
}
```
```
Data : 
{
  deliveryStatus : false
}
```
```
Response : 
{
    "transactions": [
        {
            "listItem": [
                {
                    "_id": "5dad26dab727b50e03e76232",
                    "name": "Faber Castle Kit 1",
                    "featured_image": "https://storage.googleapis.com/upload-for-ecommerce/1571628762168fabercastel.jpg",
                    "price": 540000,
                    "sum": 540000,
                    "quantity": 1
                }
            ],
            "deliveryStatus": false,
            "statusTrx": true,
            "_id": "5dad349cb727b50e03e76244",
            "user": "5dad2e30b727b50e03e76241",
            "createdAt": "2019-10-21T04:31:24.291Z",
            "updatedAt": "2019-10-21T04:38:47.050Z",
            "totalPayment": 540000,
            "totalItem": 1
        }, ...
    ]
}
```


# Error List 
| Status  | Message               | Description                      |
| ---     | -----                 | ---                              |
| 400     | Bad Request           | Input invalid (**Validation**)   |
| 401     | Unauthorize           | Token invalid                    |
| 403     | Not Found             | User/Item/TRX id invalid         |
| 500     | Error Internal Server |                                  |

## Error Status 400
### User Validation
1. name is required
2. Email is required
3. Email must include @ and .
4. Email already exist (unique)
5. Password is required 
6. Password length minimum 6
7. Address required
8. Address length minimum 12


## Article Validation
1. Name is required 
2. Image is required
3. Description is required
4. Stock is required
5. Stock minimum 1 item
6. Price is required
7. Minium item price to sell is 1000

## Transaction Validation
listItem is required