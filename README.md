# e-commerce



## USERS ROUTE



#### `POST` /REGISTER

##### Success Response 

Response status: `201`

```json
{
	_id: ObjectId(IDGeneratedFromTheDatabase),
	name: John Doe,
	email: john@doe.com,
	password: vcxlajjweaujoj013020911 (Hashed password),
	role: user
}

```

##### Validation Error Responses

1. When email is empty

   Status :`400`

```` 
{
	message: 'Email address cannot be empty'
}
````

2. When password is empty

   Status: `400`

``` 
{
	message: 'Password cannot be empty'
}
```

3. When name  is empty

   Status: `400`

```
{
	message: 'Name cannot be empty'
}
```

4. When the email is already taken: 

   Status: `400`

```
{
	message: 'This email address has already in use'
}
```

5. When email format is invalid:

   Status: `400`

```
{
	message: 'Invalid email address'
}
```



#### `POST` /LOGIN

##### Success Response 

Status `200`

```
{
	token: 'vajlfjda1298syf87yweyyha87qiq' (Generated token)
}
```

##### Error Response

1. When email and/or password is empty or invalid:

Status: `400`

```
{
	message: 'Wrong email/password'
}
```



#### `GET` /VERIFYTOKEN

##### `Headers: Token`

##### Success Response 

Status: `200`

```
{
	message: 'User verified'
}
```



##### Error Response

Status:  `401`

```
{
message: 'User not verified'
}
```



## PRODUCT ROUTE

#### `GET` /PRODUCTS

##### `Headers: Token`

##### Success Response 

```
[
    {
        _id : ObjectId(fdajljasdoiau209lsjfa),
        name: product name 1,
        price: 1234456,
        stock: 123
    },
    {
        _id : ObjectId(9714hs8r729uufasuf98a),
        name: product name 2,
        price: 1234456,
        stock: 123
    },
    {
        _id : ObjectId(sdufoiwu891uodoai1),
        name: product name 3,
        price: 1234456,
        stock: 123
    }
]
```





#### `POST` /PRODUCTS



#### `GET` PRODUCTS/:id



#### `PATCH` /PRODUCTS/:id



#### `DELETE` /PRODUCTS/:id



## CART ROUTE

#### `GET` /CARTS



#### `POST` /CARTS



#### `GET` /CARTS/:id



#### `PATCH` /CARTS/:id







## TRANSACTION ROUTE



#### `GET ` /TRANSACTIONS



#### `POST` /TRANSACTIONS



#### `GET` /TRANSACTIONS//:id



#### `PATCH` /TRANSACTIONS//:id



#### `DELETE` /TRANSACTIONS/:id







