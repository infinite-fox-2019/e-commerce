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

