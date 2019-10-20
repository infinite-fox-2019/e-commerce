**Ecommerce**
----

**Admin Account for Testing*

Email : admin@email.com

Password : admins

just admin that can Create, Update, Delete Products
all other people that register is count as an users

**Usage**

# Register and Login

**POST /register**
* **URL**

  `/register`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' email 'value' = your email`

   `'key' password 'value' = your password`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "_id": "your id",
        "email": "your email,
        "password : your hashed password
    }
    ```
 
* **Error Response:**

    
If Email already in database

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Email is already Token' }`

If Password less than 6 character

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Password less than 6 character }`

If input is empty

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'email/password is required }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

**POST /login**
* **URL**

  `/login`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' email 'value' = your email`

   `'key' password 'value' = your password`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "token": your token
    }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ invalid email/password" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

# admins

**GET /admins**
* **URL**

  `/admins`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "role": "admins",
        "listProducts": [
            {
                "_id": "your products id",
                "name": "your products name",
                "description" : "your products description"
                "image" : "your products image",
                "price": "your price",
                "stock": "products stock"
            }
            	............................................and more
        ],
        "_id": "your id",
        "email": "your email",
        "password": "your hassed password"
    }

    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : not login" }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: "not authorized" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**POST /admins**
* **URL**

  `/admins`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' name 'value' = your product name`

   `'key' description 'value' = your product descripton`

   `'key' stock 'value' = your product stock`
   
   `'key' price 'value' = your product price`

   `'key' stock 'value' = your product stock`


* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "role": "admins",
        "listProducts": [
            {
                "_id": "your products id",
                "description" : "your new description"
                "image" : "your new products image",
                "name": "your new products name",
                "price": "your new price",
                "stock": "your new products stock"
            }
            	............................................and more
        ],
        "_id": "your id",
        "email": "your email",
        "password": "your hassed password"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : name is required" }`

  * **Code:** 400 <br />
    **Content:** `{ message : price is required" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`



**PATCH /admins/:id**
* **URL**

  `/admins/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' = product ID`

* **Data Body**
 
    **body:** 

   `'key' name 'value' = your product name`

   `'key' description 'value' = your product descripton`

   `'key' stock 'value' = your product stock`
   
   `'key' price 'value' = your product price`

   `'key' stock 'value' = your product stock`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
      "_id": "your products id",
      "description" : "your updated products description"
      "image" : "your updated products image",
      "name": "your updated new products name",
      "price": "your updated new price",
      "stock": "your updated products stock"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ name is required" }`

  * **Code:** 400 <br />
    **Content:** `{ price is required" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: "not authorized" }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**DELETE /admins/:id**
* **URL**

  `/admins/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**

    **params:** 

    `'params' = product ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
      "_id": "your products id",
      "description" : "your deleted products description"
      "image" : "your deleted products image",
      "name": "your deleted new products name",
      "price": "your deleted new price",
      "stock": "your deleted products stock"
    } 
    ```
 
* **Error Response:**


  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: "not authorized" }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

# users

**GET /users**
* **URL**

  `/users`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
      data : [
          {
              "_id": "listed products id",
              "name": "listed products name",
              "price": "listed price",
              "stock": "listed stock"
          }
          	............................................and more
      ],
      payload : {
        id: "Your Id",
        role : "Your Role",
        email : "Your Email"
      }
    }

    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**POST /users**
* **URL**

  `/users`

* **Method:**

  `POST` 
  
* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "ProductsId": [ empty cart ],
        "price": 0,
        "quantity": 0,
        "_id": "your cart id",
        "UserId": "your user id"
    }
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`

  * **Code:** 400 <br />
    **Content:** `{ message : "already created" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`



**DELETE /users**
* **URL**

  `/users`

* **Method:**

  `DELETE` 
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
      your deleted cart
    }
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`

  * **Code:** 404 <br />
    **Content:** `{ message : "no cart found" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

# carts

**GET /carts**
* **URL**

  `/carts`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "ProductsId": [ your listed items ],
        "price": products price,
        "quantity": products quantity,
        "_id": "your cart ID",
        "UserId": "your ID"
    }
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**PATCH /carts**
* **URL**

  `/carts/:id`

* **Method:**

  `PATCH` 

* **Data Params**

    **params:** 

    `'params' = product ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
      your added products from ProductsId
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "already in cart" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**DELETE /carts**
* **URL**

  `/carts/:id`

* **Method:**

  `DELETE` 

  * **Data Params**

    **params:** 

    `'params' = product ID`
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
      your deleted products from ProductsId
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "no item found" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

# upload


**POST /upload**
* **URL**

  `/upload`

* **Method:**

  `POST` 

* **Data Body**
 
    **form-data:** 

   `'key' title 'image' = your image`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "status": 200,
        "message": "Your file is successfully uploaded",
        "link": "your cloud image link"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`






    