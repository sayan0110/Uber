# User Registration Endpoint Documentation

## Endpoint

`POST /user/register`

## Description
Registers a new user in the system. Validates the input data, hashes the password, and stores the user in the database. Returns a JWT token and user data upon successful registration.

## Request Body
The endpoint expects a JSON object with the following structure:

```
{
  "fullName": {
    "firstName": "string (min 3 chars)",
    "lastName": "string (min 3 chars)"
  },
  "email": "string (valid email)",
  "password": "string (min 8 chars)"
}
```

### Example Request
```
POST /user/register
Content-Type: application/json

{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "supersecret123"
}
```

## Validation
- `email` must be a valid email address.
- `fullName.firstName` and `fullName.lastName` must be at least 3 characters.
- `password` must be at least 8 characters.

## Response
### Success (200 OK)
```
{
  "user": {
    "_id": "<user_id>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Validation Error (200 OK)
```
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
    // ...other errors
  ]
}
```

### Other Errors
- If the email is already registered: `{ "error": "Email is already registered" }`
- If required fields are missing: `{ "error": "All fields are required" }`

## Data Storage Format
User data is stored in the database as:
```
{
  "_id": "<user_id>",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "<hashed_password>"
}
```

## Sample Registered User Data
```
{
  "_id": "60f7c2b5e1d2c8a1b4e5d123",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36r1aFQy4l6l1aFQy4l6l1aFQy"
}
```

# User Login Endpoint Documentation

## Endpoint

`POST /user/login`

## Description
Authenticates a user with email and password. Validates input, checks credentials, and returns a JWT token and user data if successful.

## Request Body
The endpoint expects a JSON object:

```json
{
  "email": "string (valid email)",
  "password": "string (min 8 chars)"
}
```

### Example Request

```http
POST /user/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "supersecret123"
}
```

## Validation
- `email` must be a valid email address.
- `password` must be at least 8 characters.

## Response

### Success (200 OK)
```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Validation Error (200 OK)
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
    // ...other errors
  ]
}
```

### Authentication Error (401 Unauthorized)
```json
{
  "error": "Invalid email or password"
}
```

## Sample User Login

### Example Request

```http
POST /user/login
Content-Type: application/json

{
  "email": "jane.smith@example.com",
  "password": "mypassword123"
}
```

### Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60f7c2b5e1d2c8a1b4e5d456",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com"
  }
}
```

### Example Error Response

```json
{
  "error": "Invalid email or password"
}
```
