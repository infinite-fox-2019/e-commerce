# e-commerce


**Usage**

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ git clone https://github.com/arnoldtherigan15/e-commerce.git
$ cd server
```

Make a .env file with the same parameters in .env.example file
```
$ touch .env
```
set the values of with your preferences

Run the server with these commands:
```
$ npm install
$ npm run dev
```

|     Route      | HTTP Method |                  Description                   |
| :------------: | :---------: | :--------------------------------------------: |
| /user/register |    POST     |               Create new Account               |
|  /user/login   |    POST     |                   Login User                   |
|   /products    |     GET     | Get all Product `(Super_Admin,Admin,Customer)` |
|   /products    |     PUT     |       Edit Product `(Super_Admin,Admin)`       |
|   /products    |   DELETE    |      Delete Product `(Super_Admin,Admin)`      |
|     /carts     |     GET     |           Get All Carts `(Customer)`           |
|     /carts     |    POST     |           Create Carts `(Customer)`            |
|     /carts     |    PATCH    |           Update Carts `(Customer)`            |
|     /carts     |   DELETE    |           Delete Carts `(Customer)`            |
| /transactions  |     GET     |          Get Transaction `(Customer)`          |
| /transactions  |    POST     |        Create Transaction `(Customer)`         |

**POST /user/register**

* **URL**

  `http://localhost:3000/user/register`

* **Method:**

  `POST` 
  
* **Data Params**

   **body:** 
   * **`'username' (string)`**
   * **`'email' (string)`**
   * **`'password' (string)`**
   * **`'role' (string)`**

* **Success Response:**

  * **Code:** 201 
    **Content Example:** 
    
    ```json
    [ 
  	  { 
        "_id" : ObjectId("5da1b606c199d325887f11e8"),
            "username" : "arnold15",
            "email" : "arnoldtherigan15@gmail.com",
            "password" : "$2a$10$kywHFLMJw/uUeFW0uNlHFeQKsLRjhySYZB08e.cQF4bWQUfKqXO32",
            "role" : "admin",
            "createdAt" : ISODate("2019-10-12T11:16:22.119Z"),
            "updatedAt" : ISODate("2019-10-12T11:16:22.119Z")
      }
    ]
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST 
    **Content:** 
    * **`{ message: 'username required' }`**
    * **`{ message: 'password required' }`**
    * **`{ message: 'email required' }`**
    * **`{ message: 'username is already taken' }`**
    * **`{ message: 'email is already taken' }`**

  OR

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ message: "Internal Server Error" }`


**POST /user/login**
* **URL**

  `http://localhost:3000/user/login`

* **Method:**

  `POST` 
  
* **Data Params**

   **body:** 
   * **`'email' (string)`**
   * **`'password' (string)`**

* **Success Response:**

  * **Code:** 201 
    **Content Example:** 
    
    ```json
    [ 
  	  { 
        "token" : "
                       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldml0YTE1IiwiX2lkIjoiNWRhMjBhOTA4OGEwNTQ0YjJlNTUwNDEzIiwiZW1haWwiOiJkZXZpdGFAbWFpbC5jb20iLCJpYXQiOjE1NzA5ODM2MTl9.yOaGL6PZk0TtPPOoJwp_pBzcTge4DRyzhMfCTKjZ34A",
            "username" : "arnold15"
      }
    ]
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST 
    **Content:** 
    * **`{ message: 'invalid email or password' }`**

  OR

  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ message: "Internal Server Error" }`

**POST /product**
* **URL**

  `http://localhost:3000/product`

* **Method:**

  `POST` 
  
* **Data Params**

   **body:** 
   * **`'name' (string)`**
   * **`'description' (string)`**
   * **`'stock' (number)`**
   * **`'price' (number)`**

* **Success Response:**

  * **Code:** 201 
    **Content Example:** 
    
    ```
    [ 
  	    { 
        "_id" : ObjectId("5da1b606c199d325887f11e8"),
            "name" : "iphone x",
            "description" : "iphone x kw super tampilan ori, no kaleng kaleng",
            "stock" : 20,
            "price" : 5000000
            "createdAt" : ISODate("2019-10-12T11:16:22.119Z"),
            "updatedAt" : ISODate("2019-10-12T11:16:22.119Z")
      }
    ]
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST 
    **Content:** 
    * **`{ message: 'name is required' }`**
    * **`{ message: 'description is required' }`**
    * **`{ message: 'stock is required' }`**
    * **`{ message: 'price is required' }`**

  OR

  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ message: "Internal Server Error" }`
