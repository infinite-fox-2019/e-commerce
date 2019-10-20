

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

**Code:** 201 <br />
    **Content Example:** 
  
```
{
	"id":  "5dacdd001ac229378f8a4a49",
	"username":  "stephenstrange",
	"role":  "admin",
	"access_token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWNkZDAwMWFjMjI5Mzc4ZjhhNGE0OSIsInVzZXJuYW1lIjoic3RlcGhlbnN0cmFuZ2UiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzE2MDk4NTZ9.Jba2XlzRA-VMjjXstMsHz3Bp5SbbRDGAZI5GfChw1KE"
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
	"id":  "5dacdd001ac229378f8a4a49",
	"username":  "stephenstrange",
	"role":  "admin",
	"access_token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWNkZDAwMWFjMjI5Mzc4ZjhhNGE0OSIsInVzZXJuYW1lIjoic3RlcGhlbnN0cmFuZ2UiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzE2MDk5MjB9.Hl48CYQm8pwvaGQ7LhH_KSt_bHWyEBxXrcAvZ2Os2OE"
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
----

**GET /products**
* **URL**

  `/products`

* **Method:**

  `GET` 
  
* **Data Params**
 
   **-**


* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
[
	{
		"_id":  "5dacbc6482fbd6290cfc11b9",
		"name":  "Tambah",
		"description":  "wddw2daaa",
		"price":  130000,
		"stock":  2,
		"series":  "S.H.Figuarts",
		"image":  "https://storage.googleapis.com/multiverse-images.satyowicaksana.online/1571601507629-Screen Shot 2019-10-20 at 4.30.54 PM.png"
	}
]
```
 
* **Error Response:**


**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
**POST /products**
* **URL**

  `/products`

* **Method:**

  `POST` 
  
* **Data Params**

  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |

   **body:**

	| property | type | description |
	|--|--|--|
	|`'name'`| string | the name of the product |
	|`'description'`| string | the description about the product |
	|`'price'`| number | the price of the product |
	|`'stock'`| number | the stock of the product |
	|`'series'`| string | the brand series of the product |
	|`'image'`| string | an URL to the image of the product |


* **Success Response:**

**Code:** 201 <br />
    **Content Example:** 
  
```
{
	"_id":  "5dacde671ac229378f8a4a4a",
	"name":  "SHF Spider-Man",
	"description":  "New Spider-Man figure by SHF",
	"price":  950000,
	"stock":  5,
	"series":  "S.H.Figuarts",
	"image":  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTj8izB6bpYgUBwlbRGWJbJbzLAIsKQBIsW4Zd4fASk2k67EsuC"
}
```
 
* **Error Response:**

**Code:** 400 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Description cannot be empty",
		"Stock cannot be zero or less"
	]
}
```
**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You have to login first!"
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
**PUT /products/:id**
* **URL**

  `/products/:id`

* **Method:**

  `PUT` 
  
* **Data Params**

  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |

   **body:**

	| property | type | description |
	|--|--|--|
	|`'name'`| string | the name of the product |
	|`'description'`| string | the description about the product |
	|`'price'`| number | the price of the product |
	|`'stock'`| number | the stock of the product |
	|`'series'`| string | the brand series of the product |
	|`'image'`| string | an URL to the image of the product |


* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
{
	"_id":  "5dacde671ac229378f8a4a4a",
	"name":  "SHF Spider-Man",
	"description":  "New Spider-Man figure by SHF",
	"price":  950000,
	"stock":  5,
	"series":  "S.H.Figuarts",
	"image":  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTj8izB6bpYgUBwlbRGWJbJbzLAIsKQBIsW4Zd4fASk2k67EsuC"
}
```
 
* **Error Response:**

**Code:** 400 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Description cannot be empty",
		"Stock cannot be zero or less"
	]
}
```
**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You are not authorized to access this data"
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
**DELETE /products/:id**
* **URL**

  `/products/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**

  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |


   


* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
{
	"_id":  "5dacde671ac229378f8a4a4a",
	"name":  "SHF Spider-Man",
	"description":  "New Spider-Man figure by SHF",
	"price":  950000,
	"stock":  5,
	"series":  "S.H.Figuarts",
	"image":  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTj8izB6bpYgUBwlbRGWJbJbzLAIsKQBIsW4Zd4fASk2k67EsuC"
}
```
 
* **Error Response:**

**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You are not authorized to access this data"
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
**GET /carts**
* **URL**

  `/carts`

* **Method:**

  `GET` 
  
* **Data Params**

  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |




* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
[
	{
		"_id":  "5dabc230363d014e9d67a8b7",
		"customer":  "5dab165a6518751963836fef",
		"product":  {
			"_id":  "5dab0ed934e34115b90f04ca",
			"name":  "SHF Spider-Man Stealth Suita",
			"description":  "The new Spider-Man action figure from S.H.Figuarts with the look of Stealth Suit from Spider-Man: Far From Homea",
			"price":  13000001,
			"stock":  9,
			"series":  "MAFEX",
			"__v":  0,
			"image":  "https://storage.googleapis.com/multiverse-images.satyowicaksana.online/1571509171514-20191017_231252.png"
		},
		"qty":  4
	}
]
```
 
* **Error Response:**

**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You have to login first!"
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
**POST /carts**
* **URL**

  `/carts`

* **Method:**

  `POST` 
  
* **Data Params**

  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |

   **body:**

	| property | type | description |
	|--|--|--|
	|`'customer'`| string | the id of a user with role 'customer' |
	|`'product'`| string | the id of a product |
	|`'qty'`| number | the quantity of the product ordered |


* **Success Response:**

**Code:** 201 <br />
    **Content Example:** 
  
```
{
	"_id":  "5dace3891ac229378f8a4a4f",
	"customer":  "5dace3221ac229378f8a4a4e",
	"product":  "5dacde671ac229378f8a4a4a",
	"qty":  2
}
```
 
* **Error Response:**

**Code:** 400 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Quantity cannot be more than product stock"
	]
}
```
**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You have to login first!"
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
**DELETE /carts**
* **URL**

  `/carts`

* **Method:**

  `DELETE` 
  
* **Data Params**

  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |

   **body: -**


* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
{
	"_id":  "5dace3891ac229378f8a4a4f",
	"customer":  "5dace3221ac229378f8a4a4e",
	"product":  "5dacde671ac229378f8a4a4a",
	"qty":  2
}
```
 
* **Error Response:**


**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You are not authorized to access this data"
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
