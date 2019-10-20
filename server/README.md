# e-commerce

# Routes List

## User
| HTTP | Routes        | Headers | Body                           | Description                   | 
| --   | ---------     | ----    | -----                          | -----                         |
| POST | /users        | none    | name, address, email, password | Create user                   |
| POST | /users/login  | none    | email, password                | Login user                    |

## Items
| HTTP   | Routes        | Headers | Body                            | Description                   | 
| --     | ---------     | ----    | -----                           | -----                         |
| POST   | /items        | token   | name, description, tag(array),  | Create item to sell           |
|        |               |         | featured_image, stock, price    |                               |
| DELETE | /items/:id    | token   |                                 | Delete item                   |
| GET    | /items        | none    |                                 | Get all items                 |
| GET    | /items/:id    | none    |                                 | Get one item by id            |


# Detail
baseUrl : 'http://localhost:3000'
## User
### Register
- HTTP : 'post'
- Url : '/users'
- Status : **201**
```
Data : 
{
    "name": "Charlotte Lawrence",
    "address" : "61 Clemons Crossing",
    "email": "charlce@amazon.com",
    "password": "toolate"
}
```
```
Response : 
{
    "name": "Charlotte Lawrence",
    "address" : "61 Clemons Crossing",
    "email": "charlce@amazon.com",
    "password": **Hash Password**,
    "token": **token**
}
```
### Login 
- HTTP : 'post'
- Url : '/users/login'
- Status : **200**
```
Data : 
{
    "email": "charlce@amazon.com",
    "password": "toolate"
}
```
```
Response : 
{
    "name": "Charlotte Lawrence",
    "address" : "61 Clemons Crossing",
    "email": "charlce@amazon.com",
    "token": **token**
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
    tags : ['high quality', 'best seller', 'expert'],
    stock : 6,
    price : '160000'
}
```
```
Response : 
{
  tags: [ 'high quality', 'best seller', 'expert' ],
  _id: '5da54b6c2658c628e19a0cb8',
  name: 'Van Gogh',
  featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
  description: 'for best quality paint',
  stock: 6,
  price: 160000,
  createdAt: '2019-10-15T04:30:36.701Z',
  updatedAt: '2019-10-15T04:30:36.701Z'
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
    tags: [ 'high quality', 'best seller', 'expert' ],
    _id: '5da5667476c84d470a763923',
    name: 'Van Gogh',
    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
    description: 'for best quality paint',
    stock: 6,
    price: 160000,
    createdAt: '2019-10-15T06:25:56.214Z',
    updatedAt: '2019-10-15T06:25:56.214Z'
  }
]
```

## Get One Item
- HTTP : 'get'
- Url : '/items/:id'
- Status : **200**
```
Response :
{
  tags: [ 'high quality', 'best seller', 'expert' ],
  _id: '5da566b8ba2f9f47a10b826f',
  name: 'Van Gogh',
  featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
  description: 'for best quality paint',
  stock: 6,
  price: 160000,
  createdAt: '2019-10-15T06:27:04.399Z',
  updatedAt: '2019-10-15T06:27:04.399Z'
}
```
