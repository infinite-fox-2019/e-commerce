# e-commerce

#### API DOCUMENTATION



#### POST USER /REGISTER

require body  

```
{
	username : String,
	email : String, unique, email format,
	password : String
}
```

response success

```JSON
{
	ObjectId : ObjectId('id')
	username : String
	emai : String
	password : hashPassword(String)
	cart : array of ObjectId(product)
	transaction : [ ObjectId(transaction) ]
	admin : false
	__V : String	
}
```

response fail

```JSON
email error
{
	message : "invalid email format"
}
or
{
	message : "email has benn used by another user"
}

if username, email, password empty
{
	message : "all fields must be filled"
}
```



#### POST USER/LOGIN

require body 

```JSON
{
	email : String,
	password : String
}
```

response success

```JSON
{
    token : ENRYPTED USER DATA,
    user : { 
		username: String,
    	email: String,
    	cart : Array,
	}
    
}
```

response fail

```JSON
{
	message : "wrong password/email"
}
```





#### POST PRODUCT/

require body and headers

```JSON
body : {
    name : String, required
    qty : Number, required, default:1
    description : String, min : 50, max : 150, required
    price : Number, required
    image : file, required (send to gcs)
	category : String
}
headers : {
    token : encrypted user(admin role) data
}
```

response success :

```
{
	name : String
    qty : Number
    description : String
    price : Number
    image : gcs file link
	category : String
}
```

response fail 

```JSON
{
	message : [ message(String) ] // name is required, qty is required, ....	
}

or 

{
    message : 'authenticatoin error' // if token generated randomly by user, or token not set as headers
}

or

{
    message : 'authorization error' // if token contain non admin role
}
```





#### GET PRODUCT/

require : none

response success 

```JSON
{
	products : [
		{
			name : String
    		qty : Number
    		description : String
    		price : Number
    		image : gcs file link
			category : String
		}
	]
}
```

response fail

```JSON
{
	message : 'internal server error'
}
```







#### GET PRODUCT/:id

require product id set as params(id)

response success

```JSON
{
    name : String
    qty : Number
    description : String
    price : Number
    image : gcs file link
    category : String
}
```

response fail

```JSON
{
	message : 'product not found'
}
```





#### DELETE PRODUCT/:id

require product id set as params(id), and headers

```JSON
headers : {
    token : encrypted user(admin role) data
}
```

response success

```JSON
{
    message : 'successfully deleted product with id : id'
}
```

response fail

```JSON
{

	message : 'data not found'

}

or

{

	message : 'authentication failed' // if token generated randomly by user, or token not set as headers

}

or

{
    message : 'authorization error' // if token contain non admin role
}
```





#### PATCH PRODUCT/:id

require a body  updated data, and token set as headers

```JSON
body : {
    name : String
    qty : Number
    description : String
    price : Number
    image : gcs file link
    category : String
}

headers : {
    token : encrypted user(admin role) data
}

```

response success

```JSON
{
    message : 'successfully updated product'
}
```

response fail

```JSON
{

	message : 'data not found'

}

or

{

	message : 'authentication failed' // if token generated randomly by user, or token not set as headers

}

or

{
    message : 'authorization error' // if token contain non admin role
}
```



