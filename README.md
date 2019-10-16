# e-commerce

usage API endpoints:

```
http://localhost:3000/<resource>
```

For example:

```
http://localhost:3000/login
http://localhost:3000/register
```

<br>

## User

### POST `/register`

Register new user

```
http://localhost:3000/register
```

<br>

#### Headers

|                  |                                   |
| ---------------- | --------------------------------- |
| **Content-Type** | application/x-www-form-urlencoded |

<br>

#### Body

|              |        |                   |
| ------------ | ------ | ----------------- |
| **name**     | String | Ahmad Fadilah     |
| **role**     | String | costumer \| admin |
| **email**    | String | fadil@mail.com    |
| **password** | String | fadil             |

<br>

### POST `/login`

Login user

```
http://localhost:3000/login
```

<br>

#### Headers

|                  |                                   |
| ---------------- | --------------------------------- |
| **Content-Type** | application/x-www-form-urlencoded |

<br>

#### Body

|              |        |                |
| ------------ | ------ | -------------- |
| **email**    | String | fadil@mail.com |
| **password** | String | fadil          |

<br>