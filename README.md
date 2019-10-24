# e-commerce

**Usage**
Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ git clone https://github.com/group-project-w1-BigFridge/server.git
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
|     Route     | HTTP Method |     Description      |
| :-----------: | :---------: | :------------------: |
|   /register   |    POST     |   Create new user    |
|    /login     |    POST     |    Login to user     |
|   /products   |     GET     |   Get all products   |
|   /products   |    POST     | Create new products  |
|   /products   |     PUT     |   Update products    |
|   /products   |   DELETE    |   Delete products    |
|  /categories  |     GET     |  Get all categories  |
|    /carts     |     GET     |    Get all carts     |
|    /carts     |    POST     |   Create new carts   |
|    /carts     |    PATCH    |     Update carts     |
|    /carts     |   DELETE    |     Delete carts     |
| /transactions |     GET     | Get all transactions |
| /transactions |    POST     |  Create transaction  |
|    /upload    |    POST     |  Upload some image   |

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
  
  * **Code:** 201 <br />
    **Content Example:** 
    
    ```
    {
        "_id" : ObjectId("5da1c1ca2deda51783c09f68"),
        "username" : "evans",
        "password" : "$2a$11$VBErLnOBM/1zv/0v7QR3muKOeLpKOdLZ5v0XZuzuPWdyH7GIxGJHy",
        "email" : "evans@mail.com",
        "role" : "customer",
        "createdAt" : ISODate("2019-10-12T12:06:34.802Z"),
        "updatedAt" : ISODate("2019-10-12T12:06:34.802Z")
    }
    ```
  
* **Error Response:**
  
  - **Code:** 400 BAD REQUEST <br />
    **Content:** 
    
     * **`{ message: 'username required' }`**
     * **`{ message: 'password required' }`**
     * **`{ message: 'email required' }`**
     * **`{ message: 'email is already taken' }`**
 * **`{ message: 'invalid email format' }`**
    
  OR
    
  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

**POST /user/login**

- **URL**
  `http://localhost:3000/user/login`

- **Method:**
  `POST` 

- **Data Params**

  **body:** 

  - **`'email' (string)`**
  - **`'password' (string)`**

- **Success Response:**

  - **Code:** 200 <br />
    **Content Example:** 

    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV2YW5zQG1haWwuY29tIiwiX2lkIjoiNWRhMWMxY2EyZGVkYTUxNzgzYzA5ZjY4IiwiaWF0IjoxNTcxMDI3Nzc5fQ.Vw1754xM0CE5_WD77zM3AcKupUqOtycE_LIvWQYs_DA",
        "username": "evans"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'invalid username or password' }`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

**POST /product**

- **URL**
  `http://localhost:3000/product`

- **Method:**
  `POST` 

- **Data Params**

  **body:** 

  - **`'name' (string)`**
  - **`'description' (string)`**
  - **`'stock' (number)`**
  - **`'price' (number)`**

- **Success Response:**

  - **Code:** 201 <br />
    **Content Example:** 

    ```
    {
        "_id" : ObjectId("5da1c1ca2deda51783c09f68"),
        "name" : "permen",
        "description" : "ini permen biasa",
        "stock" : 30,
        "price" : 5000,
        "createdAt" : ISODate("2019-10-12T12:06:34.802Z"),
        "updatedAt" : ISODate("2019-10-12T12:06:34.802Z")
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />**Content:** 

    - **{ message: 'name required' }**
    - **{ message: 'description required' }**
    - **{ message: 'stock required' }**
    - **{ message: 'price is already taken' }**

  - 

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`