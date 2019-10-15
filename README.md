
**Multiverse**
----

**POST /users/register**
* **URL**

  `/recipes`

* **Method:**

  `POST` 
  
* **Data Params**
 
   **body:**
   
	| property | type | description |
	|--|--|--|
	|`'username'`| string | the username of the user |
	|`'email'`| string | the email of the user |
	|`'password'`| string | the password of the user |
	|`'admin_password'` (optional)| string | a password to make the user has the role of admin |


* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
{
	"id":  "5da5d515aead0365e52beb80",
	"username":  "stephenstrange",
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTVkNTE1YWVhZDAzNjVlNTJiZWI4MCIsInVzZXJuYW1lIjoic3RlcGhlbnN0cmFuZ2UiLCJpYXQiOjE1NzExNDkwNzd9.hj_XW8sXMnVMt8HOgMKIHmt6p3YyZzJa7onl06k8MR8"
}
```
 
* **Error Response:**

**Code:** 400 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Username cannot be empty",
		"Email cannot be empty",
		"Password cannot be empty"
	]
}
```

**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
----

**POST /users/login**
* **URL**

  `/users/login`

* **Method:**

  `POST` 
  
* **Data Params**
 
   **body:**
   
	| property | type | description |
	|--|--|--|
	|`'username'`| string | the username of the user |
	|`'password'`| string | the password of the user |


* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
{
	"id":  "5da5d515aead0365e52beb80",
	"username":  "stephenstrange",
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTVkNTE1YWVhZDAzNjVlNTJiZWI4MCIsInVzZXJuYW1lIjoic3RlcGhlbnN0cmFuZ2UiLCJpYXQiOjE1NzExNDkwNzd9.hj_XW8sXMnVMt8HOgMKIHmt6p3YyZzJa7onl06k8MR8"
}
```
 
* **Error Response:**

**Code:** 400 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Wrong username/password"
	]
}
```
**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
