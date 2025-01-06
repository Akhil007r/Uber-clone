**User Authentication API**
==========================

**Overview**
------------

This API provides endpoints for user registration and login. It uses Express.js and utilizes the `express-validator` middleware for request validation.

**Endpoints**
------------

### Register User

* **POST /register**
	+ Request Body:
		- `fullname`: object with 
           - `firstname` (minimum of 5 Characters)
           - `lastname` (Accepts 0 Characters)
		- `email`: string
		- `password`: string (minimum of 5 Characters)
	+ Response:
		- `token`: string (JSON Web Token)
		- `user`: object (user data)

### Login User

* **POST /login**
	+ Request Body:
		- `email`: string
		- `password`: string 
	+ Response:
		- `token`: string (JSON Web Token)
		- `user`: object (user data)

**Error Handling**
-----------------

* If validation errors occur, a 400 response with an array of error messages is returned.
* If the login credentials are invalid, a 400 response with a generic error message is returned.

**Implementation Details**
-------------------------

* The `userModel` module is used for password hashing and user data management.
* The `userService` module is used for creating new users.
* The `express-validator` middleware is used for request validation.

**Example Use Cases**
--------------------

* Register a new user:
```bash
curl -X POST \
  http://localhost:4000/register \
  -H 'Content-Type: application/json' \
  -d '{"fullname": {"firstname": "John", "lastname": "Doe"}, "email": "johndoe@example.com", "password": "password123"}'
```
* Login an existing user:
```bash
curl -X POST \
  http://localhost:4000/login \
  -H 'Content-Type: application/json' \
  -d '{"email": "johndoe@example.com", "password": "password123"}'
```

### LOGOUT USER
 
**POST /login**
-----------------

* Logout User

* Description: Logs out the authenticated user.
* Request Body: None
* Response:
  + 200 OK: Logout successful
  + 401 Unauthorized: Authentication failed

Note: Replace `http://localhost:4000` with the actual URL of your API. or .ENV Port Value

### GET USER / PROFILE

#### Retrieve User Profile

* **Description:** Retrieves the authenticated user's profile information.
* **Request Body:** None
* **Response:**
	+ **200 OK:** User profile information (JSON)
		- `id`: User ID
		- `username`: Username
		- `email`: Email address
		- `name`: Full name
	+ **401 Unauthorized:** Authentication failed

#### Example Response:
```json
{
  "id": 1,
  "username": "johnDoe",
  "email": "johndoe@example.com",
  "name": "John Doe"
}

