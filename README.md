# E-Commerce

## Show All User

Return json data about all users

- #### URL

  /users

- #### Method

  GET

- #### URL Params

  None

- #### Data Params

  None

- #### Success Response

  - ##### Code : 200

  - ##### Content : 

    ```json
    [
        {
            id : ObjectId,
            username : String,
            password : String,
            email : String,
            admin : Boolean,
            cart : Array of Object (product model)
        }
    ]
    ```

- #### Error Response

  - ##### Code : 404 NOT FOUND

  - ##### Content : 

    ```javascript
    {error : "Users doesn't exist"}
    ```

- #### Sample Call

  example calling routes using axios:

```javascript
axios({
    method : 'get',
    url : '/users'
})
```



## Show User

Return json data about a single user

- #### URL

  /user/:id

- #### Method

  GET

- #### URL Params

  Required : 

  id=integer

- #### Data Params

  None

- #### Success Response

  - ##### Code : 200

  - ##### Content : 

    ```json
    user : {
        id : ObjectId,
        username : String,
        password : String,
        email : String,
        admin : Boolean,
        cart : Array of Object (product model)
    }
    ```

- #### Error Response

  - ##### Code : 404 NOT FOUND

  - ##### Content : 

    ```javascript
    {error : "User doesn't exist"}
    ```

- #### Sample Call

  example calling routes using axios:

```javascript
axios({
    method : 'get',
    url : '/users/1'
})
```



## Add New User

Return json data token

- #### URL

  /users/add

- #### Method

  POST

- #### URL Params

  None

- #### Data Params

  Body : 

  ```javascript
  {
      username : String, <required>
      password : String, <required>
      email : String, <required>
  }
  ```

- #### Success Response

  - ##### Code : 200

  - ##### Content :

    ```json
    {
       token : String
    }
    ```

- #### Error Response

  - ##### Code : 422 UNPROCESSABLE ENTRY 

  - ##### Content : 

    ```javascript
    [
        {error : "Email must not empty"}
    ]
    ```

    or

  - ##### Code : 400 BAD REQUEST 

  - ##### Content : 

    ```javascript
    [
        {error : "Format email is invalid"}
    ]
    ```

    or

  - ##### Code : 409 CONFLICT 

  - ##### Content : 

    ```javascript
    [
        {error : "Email already in use"}
    ]
    ```

- #### Sample Call

  example calling routes using axios:

```javascript
axios({
    method : 'post',
    url : '/users/add',
    data : {
        username : String,
        password : String,
        email : String,
        admin : Boolean, (default false)
    }
})
```

## Update User

Return json data about updated users

- #### URL

  /users/:id

- #### Method

  PATCH

- #### URL Params

  <ObjectId(user)>

- #### Data Params

  Body : 

  ```javascript
  {
      "username" : String,
      "password" : String,
      "email" : String,
      "cart" : Array of Object (product model)
  }
  ```

  Headers :

  ```json
  {token : <user_token>}
  ```

  

- #### Success Response

  - ##### Code : 200

  - ##### Content :

    ```json
    {
        "ok" : 1,
        "nModified" : 1,
        "n" : 1
    }
    ```

- #### Error Response

  - ##### Code : 422 UNPROCESSABLE ENTRY 

  - ##### Content : 

    ```javascript
    [
        {error : "Email must not empty"}
    ]
    ```

    or

  - ##### Code : 400 BAD REQUEST 

  - ##### Content : 

    ```javascript
    [
        {error : "Format email is invalid"}
    ]
    ```

    or

  - ##### Code : 409 CONFLICT 

  - ##### Content : 

    ```javascript
    [
        {error : "Email already in use"}
    ]
    ```

- #### Sample Call

  example calling routes using axios:

```javascript
axios({
    method : 'patch',
    url : '/users/:id',
    data : {
        username : String,
        password : String,
        email : String,
        admin : Boolean, (default false)
    }
})
```

## Delete User

Return json data about deleted users

- #### URL

  /users/:id

- #### Method

  DELETE

- #### URL Params

  <ObjectId(user)>

- #### Data Params

  Headers : 

  ```javascript
  {
   token : <user_token>
  }
  ```

- #### Success Response

  - ##### Code : 200

  - ##### Content :

    ```json
    {
        "ok" : 1,
        "n" : 1
    }
    ```

- #### Error Response

  - ##### Code : 401 UNAUTHORIZED 

  - ##### Content : 

    ```javascript
    [
        {error : "Only authorize account can access"}
    ]
    ```

- #### Sample Call

  example calling routes using axios:

```javascript
axios({
    method : 'DELETE',
    url : '/users/:id',
    headers : {
        token : String
    }
})
```

## Login User

Return json data about updated users

- #### URL

  /users/:id

- #### Method

  POST

- #### URL Params

  <ObjectId(user)>

- #### Data Params

  Body : 

  ```javascript
  {
      "username" : String,
      "password" : String,
      "email" : String,
      "cart" : Array of Object (product model)
  }
  ```

- #### Success Response

  - ##### Code : 200

  - ##### Content :

    ```json
    {
        token : token_ObjectId
    }
    ```

- #### Error Response

  - ##### Code : 422 UNPROCESSABLE ENTRY 

  - ##### Content : 

    ```javascript
    [
        {error : "Email must not empty"}
    ]
    ```

    or

  - ##### Code : 400 BAD REQUEST 

  - ##### Content : 

    ```javascript
    [
        {error : "Format email is invalid"}
    ]
    ```

    or

  - ##### Code : 409 CONFLICT 

  - ##### Content : 

    ```javascript
    [
        {error : "Email already in use"}
    ]
    ```

- #### Sample Call

  example calling routes using axios:

```javascript
axios({
    method : 'post',
    url : '/users//login',
    data : {
        username : String,
        password : String,
        email : String,
        admin : Boolean, (default false)
    }
})
```

## Add Product Into Cart

Return json data about updated users

- #### URL

  /users/:_id/addcart

- #### Method

  PATCH

- #### URL Params

  <ObjectId(user)>

- #### Data Params

  Body : 

  ```javascript
  {
      "productId" : ObjectId of Product,
      "qty" : Number
  }
  ```

  Headers : 

  ```javascript
  {
   token : <user_token>
  }
  ```

- #### Success Response

  - ##### Code : 200

  - ##### Content :

    ```json
    {
        "ok" : 1,
        "nModified" : 1,
        "n" : 1
    }
    ```

- Error Response

  - ##### Code : 401 UNAUTHORIZED 

  - ##### Content : 

    ```javascript
    [
        {error : "Only authorize account can access"}
    ]
    ```

- #### Sample Call

  example calling routes using axios:

```javascript
Axios({
          method: 'patch',
          url: `http://localhost:3000/users/${id}/addcart`,
          data: {
            qty: payload.qty,
            productId: payload.productId
          },
          headers: {
            token
          }
})
```

## Remove Product From Cart

Return json data about updated users

- #### URL

  /users/:_id/updcart

- #### Method

  PATCH

- #### URL Params

  <ObjectId(user)>

- #### Data Params

  Body : 

  ```javascript
  {
      "productId" : ObjectId of Product,
  }
  ```

  Headers : 

  ```javascript
  {
   token : <user_token>
  }
  ```

- #### Success Response

  - ##### Code : 200

  - ##### Content :

    ```json
    {
        "ok" : 1,
        "nModified" : 1,
        "n" : 1
    }
    ```

- Error Response

  - ##### Code : 401 UNAUTHORIZED 

  - ##### Content : 

    ```javascript
    [
        {error : "Only authorize account can access"}
    ]
    ```

- #### Sample Call

  example calling routes using axios:

```javascript
Axios({
          method: 'patch',
          url: `http://localhost:3000/users/${id}/updcart`,
          data: {
            productId: productId
          },
          headers: {
            token
          }
    })
```

## 

## Checkout User

Return json data about updated users

- #### URL

  /users/:_id/checkout

- #### Method

  PATCH

- #### URL Params

  <ObjectId(user)>

- #### Data Params

  Headers : 

  ```javascript
  {
   token : <user_token>
  }
  ```

- #### Success Response

  - ##### Code : 200

  - ##### Content :

    ```json
    {
        "ok" : 1,
        "nModified" : 1,
        "n" : 1
    }
    ```

- Error Response

  - ##### Code : 401 UNAUTHORIZED 

  - ##### Content : 

    ```javascript
    [
        {error : "Only authorize account can access"}
    ]
    ```

- #### Sample Call

  example calling routes using axios:

```javascript
 Axios({
          method: 'patch',
          url: `http://localhost:3000/users/${id}/checkout`,
          headers: {
            token
          }
    })
```

## Show All Products

Return json data about all product

- #### URL

  /products

- #### Method

  GET

- #### URL Params

  None

- #### Data Params

  None

- #### Success Response

  - ##### Code : 200

  - ##### Content : 

    ```json
    [
        {
            "image": "https://storage.googleapis.com/miniwp.nadhiljanitra.xyz/157147976215834627.png",
            "_id": "5daae0e0ad87f861423bcbf1",
            "name": "keranjang",
            "price": 10000,
            "quantity": 6,
            "detail": "ini detail keranjang"
        }
    ]
    ```

- #### Error Response

  - ##### Code : 404 NOT FOUND

  - ##### Content : 

    ```javascript
    {error : "Products doesn't exist"}
    ```

- #### Sample Call

  example calling routes using axios:

```javascript
axios({
    method : 'get',
    url : '/products'
})
```



## Show Product

Return json data about a singleproduct

- #### URL

  /user/:_id

- #### Method

  GET

- #### URL Params

  Required : 

  id=integer

- #### Data Params

  None

- #### Success Response

  - ##### Code : 200

  - ##### Content : 

    ```json
    product : {
        "image": "https://storage.googleapis.com/miniwp.nadhiljanitra.xyz/1571479986829Desktop.png",
        "_id": "5daae1b4ad87f861423bcbf2",
        "name": "Laptop",
        "price": 500000,
        "quantity": 6,
        "detail": "ini laptop baru"
    }
    ```

- #### Error Response

  - ##### Code : 404 NOT FOUND

  - ##### Content : 

    ```javascript
    {error : "Product doesn't exist"}
    ```

- #### Sample Call

  example calling routes using axios:

```javascript
axios({
    method : 'get',
    url : '/products/5daae1b4ad87f861423bcbf2'
})
```

## Add New Product

Return json data token

- #### URL

  /products/add

- #### Method

  POST

- #### URL Params

  None

- #### Data Params

  Body : 

  ```javascript
  {
      name : String, <required>
      price : Nummber, <required>
      quantity : Number, <required>
      detail : String, <required>
      image : String(url), <required>
  }
  ```

- #### Success Response

  - ##### Code : 200

  - ##### Content :

    ```json
    {
            "image": "https://storage.googleapis.com/miniwp.nadhiljanitra.xyz/1571561736897download (3).jpeg",
            "_id": "5dac21159e78d33db9fd913e",
            "name": "Kuda",
            "price": 1000000,
            "quantity": 6,
            "detail": "ini kuda"
        },
    ```

- #### Error Response

  - ##### Code : 401 UNAUTHORIZED 

    - ##### Content : 

      ```javascript
      [
          {error : "Only authorize account can access"}
      ]
      ```

  - #### Sample Call

  example calling routes using axios:

```javascript
Axios({
            method: 'post',
            url: 'http://localhost:3000/products/add',
            data: {
                name : String, <required>
                price : Nummber, <required>
                quantity : Number, <required>
                detail : String, <required>
                image : String(url), <required>
            },
            headers: {
              token
            }
          })
```

## Update Product

Return json data about updated product

- #### URL

  /products/:_id

- #### Method

  PATCH

- #### URL Params

  <ObjectId(product)>

- #### Data Params

  Body : 

  ```javascript
  {
      name : String,
      price : Nummber,
      quantity : Number,
      detail : String,
  }
  ```

  Headers :

  ```json
  {token : <user_token>}
  ```

  

- #### Success Response

  - ##### Code : 200

  - ##### Content :

    ```json
    {
        "ok" : 1,
        "nModified" : 1,
        "n" : 1
    }
    ```

- #### Error Response

  - ##### Code : 401 UNAUTHORIZED 

    - ##### Content : 

      ```javascript
      [
          {error : "Only authorize account can access"}
      ]
      ```

- #### Sample Call

```javascript
Axios({
          method: 'patch',
          url: 'http://localhost:3000/products/:_id',
          data: {
               name : String,
                price : Nummber,
                quantity : Number,
                detail : String,
          },
          headers: { token }
        })
```

## Remove Product

Return json data about remove product

- #### URL

  /products/:_id

- #### Method

  DELETE

- #### URL Params

  <ObjectId(product)>

- #### Data Params

  Headers :

  ```json
  {token : <user_token>}
  ```

  

- #### Success Response

  - ##### Code : 200

  - ##### Content :

    ```json
    {
        "ok" : 1,
        "n" : 1
    }
    ```

- #### Error Response

  - ##### Code : 401 UNAUTHORIZED 

    - ##### Content : 

      ```javascript
      [
          {error : "Only authorize account can access"}
      ]
      ```

- #### Sample Call

- example calling routes using axios:

```javascript
Axios({
          method: 'delete',
          url: 'http://localhost:3000/products/:_id',
          headers: token
        })
```

## 