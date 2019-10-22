# e-commerce

**WEBSITE** http://furnish.uzai.site/

## **Register**

- **URL**

  /users/register

- **Method:**

  `POST`

- **Data**

  ```
  {
  	email: String,
  	password: String
  }
  ```

  

- **Success Response:**

  - **Code:** 201

    ```json
    {
        "token": "{your token}",
        "role": "{your role}"
    }
    ```

    

- **Error Response:**

  - **Code:** 400

    ```
    {
        "message": "User validation failed: email: Email is required, password:        Password is required"
    }
    ```



## **Login**

- **URL**

  /users/login

- **Method:**

  `POST`

- **Data**

  ```
  {
      email: String (required),
      password: String (required)
  }
  ```

  

- **Success Response:**

  - **Code:** 201

    ```json
    {
        "token": "{your token}",
        "role": "{your role}"
    }
    ```

    

- **Error Response:**

  - **Code:** 400

    ```
    {
        "message": "username/password is wrong"
    }
    ```

    

## **Add Cart**

- **URL**

  /users/cart

- **Method:**

  `POST`

- **Header**

  ```
  {
      token: "{your token}"
  }
  ```

  

- **Data**

  ```
  {
      ProductId: Number (required),
      qty: Number (optional)
  }
  ```

  

- **Success Response:**

  - **Code:** 201

    ```json
    {
       'Added to cart'
    }
    ```

    

- **Error Response:**

  - **Code:** 401

    ```
    {
        "message": "Please login first"
    }
    ```

    

  - **Code**: 404

    ```
    {
        "message": "product not found"
    }
    ```

    

## **Get Cart**

- **URL**

  /users/cart

- **Method:**

  `GET`

- **Header**

  ```
  {
      token: "{your token}"
  }
  ```

  

- **Success Response:**

  - **Code:** 201

    ```json
    [
        {
            "qty": 1,
            "_id": "5dac2568343e3243d454aaf0",
            "productId": {
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
                "_id": "5dab65a93e0a49194d2dc3c5",
                "name": "Efel",
                "image": "https://storage.googleapis.com/e-commerce-upload-image/1571513768126-3_fbd348fc-4a46-4729-81a2-4527d4c278b2_grande.jpg",
                "price": 50,
                "stock": 8,
                "sellerId": "5dab45c0ab533e5e4e75edd1",
                "createdAt": "2019-10-19T19:36:09.232Z",
                "updatedAt": "2019-10-20T09:20:13.370Z",
                "__v": 0
            },
            "subTotal": 50
        }
    ]
    ```

    

- **Error Response:**

  - **Code:** 401

    ```
    {
        "message": "Please login first"
    }
    ```



## **Delete Cart**

- **URL**

  /users/cart/:id

- **Method:**

  `DELETE`

- **Params**

  ```
  id=[integer]
  ```

- **Header**

  ```
  {
      token: "{your token}"
  }
  ```

  

- **Data**

  ```
  {
      ProductId: Number (required),
      qty: Number (optional)
  }
  ```

  

- **Success Response:**

  - **Code:** 201

    ```json
    {
       'Added to cart'
    }
    ```

    

- **Error Response:**

  - **Code:** 401

    ```
    {
        "message": "Please login first"
    }
    ```

    

  - **Code**: 404

    ```
    {
        "message": "product not found"
    }
    ```

    

## **Checkout**

- **URL**

  /transactions

- **Method:**

  `POST`

- **Header**

  ```
  {
      token: "{your token}"
  }
  ```

- **Body**

  ```
  {
      CartId: Number (required)
  }
  ```

  

- **Success Response:**

  - **Code:** 201

    ```json
    {
        'Success checkout.'
    }
    ```

    

- **Error Response:**

  - **Code:** 401

    ```
    {
        "message": "Please login first"
    }
    ```

    

  - **Code**: 404

    ```
    {
        errors: [
            "You haven't authorized"
        ]
    }
    
    ```

    

## **Create Product**

- **URL**

  /products

- **Method:**

  `POST`

- **Header**

  ```
  {
      token: "{your token}"
  }
  ```

- **Body**

  ```
  {
     name: String(required),
     description: String(required),
     image: String(optional),
     price: Number(required),
     stock: Number(required)
  }
  ```

  

- **Success Response:**

  - **Code:** 201

    ```json
    {
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
        "_id": "5dacc9fd2969167778e9b4d7",
        "name": "Tampan Chair 7",
        "image": "https://storage.googleapis.com/e-commerce-upload-image/1571604987990-2_85a5a4d4-ecd0-4284-8bba-761610f8ae04_grande.webp",
        "price": 50,
        "stock": 10,
        "sellerId": "5dab45c0ab533e5e4e75edd1",
        "createdAt": "2019-10-20T20:56:29.323Z",
        "updatedAt": "2019-10-20T20:56:29.323Z",
        "__v": 0
    }{
        'Success checkout.'
    }
    ```

    

- **Error Response:**

  - **Code:** 404

    ```
    {
      errors: [
          "Name field is required",
          "Description field is required",
          "Stock field description is required",
          "Price field is required"
      ]
    }
    ```

  - **Code**: 403

    ```
    {
        errors: [
            "You must login first"
        ]
    }
    ```

  - **Code**: 401

    `Only admin that can create product`

    ```
    {
        errors: [
            "You haven't authorized"
        ]
    }
    ```





## **Show All Product**

- **URL**

  /products

- **Method:**

  `GET`

  **Success Response:**

  - **Code:** 200

    ```json
    [
        {
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
            "_id": "5dab65603e0a49194d2dc3c3",
            "name": "Beautiful Chair",
            "image": "https://storage.googleapis.com/e-commerce-upload-image/1571513694582-1_grande.webp",
            "price": 50,
            "stock": 10,
            "sellerId": "5dab45c0ab533e5e4e75edd1",
            "createdAt": "2019-10-19T19:34:56.226Z",
            "updatedAt": "2019-10-19T19:34:56.226Z",
            "__v": 0
        },
        {
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
            "_id": "5dab658b3e0a49194d2dc3c4",
            "name": "Beautiful Chair Vonci",
            "image": "https://storage.googleapis.com/e-commerce-upload-image/1571513738243-2_85a5a4d4-ecd0-4284-8bba-761610f8ae04_grande.webp",
            "price": 50,
            "stock": 10,
            "sellerId": "5dab45c0ab533e5e4e75edd1",
            "createdAt": "2019-10-19T19:35:39.599Z",
            "updatedAt": "2019-10-19T19:35:39.599Z",
            "__v": 0
        },
    ]
    ```





## **Update Product**

- **URL**

  /products/:id

- **Method:**

  `PATCH`

- **Header**

  ```
  {
      token: "{your token}"
  }
  ```

- **params**

  ```
  ProductId = String (required)
  ```

- **Body**

  ```
  {
     stock: Number(required)
  }
  ```

  

- **Success Response:**

  - **Code:** 201

    ```json
    {
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
        "_id": "5dacc9fd2969167778e9b4d7",
        "name": "Tampan Chair 7",
        "image": "https://storage.googleapis.com/e-commerce-upload-image/1571604987990-2_85a5a4d4-ecd0-4284-8bba-761610f8ae04_grande.webp",
        "price": 50,
        "stock": 10,
        "sellerId": "5dab45c0ab533e5e4e75edd1",
        "createdAt": "2019-10-20T20:56:29.323Z",
        "updatedAt": "2019-10-20T20:56:29.323Z",
        "__v": 0
    }
    ```

    

- **Error Response:**

  - **Code:** 400

    ```
    {
      errors: [
          "Product ID is not found"
      ]
    }
    ```

  - **Code**: 403

    ```
    {
        errors: [
            "You must login first"
        ]
    }
    ```

  - **Code**: 401

    `Only admin that can create product`

    ```
    {
        errors: [
            "You haven't authorized"
        ]
    }
    ```





## **Delete Product**

- **URL**

  /products/:id

- **Method:**

  `DELETE`

- **Header**

  ```
  {
      token: "{your token}"
  }
  ```

- **params**

  ```
  ProductId = String (required)
  ```

- **Body**

  ```
  {
     stock: Number(required)
  }
  ```

  

- **Success Response:**

  - **Code:** 201

    ```json
    {
      	"Product deleted"
    }
    ```

    

- **Error Response:**

  - **Code:** 400

    ```
    {
      errors: [
          "Product ID is not found"
      ]
    }
    ```

  - **Code**: 403

    ```
    {
        errors: [
            "You must login first"
        ]
    }
    ```

  - **Code**: 401

    `Only admin that can create product`

    ```
    {
        errors: [
            "You haven't authorized"
        ]
    }
    ```



## **Show Trsactions**

- **URL**

  /transactions

- **Method:**

  `GET`

- **Header**

  ```
  {
      token: "{your token}"
  }
  ```

- **Success Response:**

  - **Code:** 201

    ```json
    [
        {
            "status": "paid",
            "_id": "5dac81d91f0d0824b6224a59",
            "items": [
                {
                    "_id": "5dac81bd1f0d0824b6224a55",
                    "qty": 1,
                    "productId": {
                        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
                        "_id": "5dab65a93e0a49194d2dc3c5",
                        "name": "Efel",
                        "image": "https://storage.googleapis.com/e-commerce-upload-image/1571513768126-3_fbd348fc-4a46-4729-81a2-4527d4c278b2_grande.jpg",
                        "price": 50,
                        "stock": 8,
                        "sellerId": "5dab45c0ab533e5e4e75edd1",
                        "createdAt": "2019-10-19T19:36:09.232Z",
                        "updatedAt": "2019-10-20T16:20:03.524Z",
                        "__v": 0
                    }
                },
                {
                    "_id": "5dac81c11f0d0824b6224a56",
                    "qty": 1,
                    "productId": {
                        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
                        "_id": "5dab65d13e0a49194d2dc3c6",
                        "name": "Tampan Chair",
                        "image": "https://storage.googleapis.com/e-commerce-upload-image/1571513807808-4_4efdb259-5a35-4704-b486-0a40112310f1_grande.webp",
                        "price": 50,
                        "stock": 8,
                        "sellerId": "5dab45c0ab533e5e4e75edd1",
                        "createdAt": "2019-10-19T19:36:49.018Z",
                        "updatedAt": "2019-10-20T15:48:17.227Z",
                        "__v": 0
                    }
                }
    ]
    ```

    

- **Error Response:**

  - **Code**: 403

    ```
    {
        errors: [
            "You must login first"
        ]
    }
    ```







## **Update Transaction Status**

- **URL**

  /transactions/:id

- **Method:**

  `PATCH`

- **Header**

  ```
  {
      token: "{your token}"
  }
  ```

- **params**

  ```
  ProductId = String (required)
  ```

  

- **Success Response:**

  - **Code:** 201

    ```json
    {
            "status": "paid",
            "_id": "5dac81d91f0d0824b6224a59",
            "items": [
                {
                    "_id": "5dac81bd1f0d0824b6224a55",
                    "qty": 1,
                    "productId": {
                        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
                        "_id": "5dab65a93e0a49194d2dc3c5",
                        "name": "Efel",
                        "image": "https://storage.googleapis.com/e-commerce-upload-image/1571513768126-3_fbd348fc-4a46-4729-81a2-4527d4c278b2_grande.jpg",
                        "price": 50,
                        "stock": 8,
                        "sellerId": "5dab45c0ab533e5e4e75edd1",
                        "createdAt": "2019-10-19T19:36:09.232Z",
                        "updatedAt": "2019-10-20T16:20:03.524Z",
                        "__v": 0
                    }
                },
    ```

    

- **Error Response:**

  - **Code:** 400

    ```
    {
      errors: [
          "Product ID is not found"
      ]
    }
    ```

  - **Code**: 403

    ```
    {
        errors: [
            "You must login first"
        ]
    }
    ```

  - **Code**: 401

    `Only admin that can create product`

    ```
    {
        errors: [
            "You haven't authorized"
        ]
    }
    ```



## Another Error

- 500 (Internal Server Error)

  ```
  {
  	errors: [
  		"Internal Server Error"
  	]
  }
  ```

