# PHP Rest API
This API allows access for the underlying MongoDB with the use of specific function calls.
## How it works
The API works over HTTP/HTTPS. It listens to any incoming connections and checks the headers adn the body.
On successful requet validation the API calls the desirec function and returns it's output.
### Valid request
A valid request satiesfies the following
* Reaquest header contains ```Content-Type: application/json```
* Request body is valid JSON
* Request JSON contains atleast ```_fn```
* Request JSON contains ```username``` and ```password```
#### Valid request JSON example
##### Request
```
{
  "_fn": "authenticateUser",
  "password": "123",
  "username": "mxsxs22"
}
```
##### Response
```
{
"success": "5a8b283e44279f1644003536"
}
```

### Response format
The server response is always a JSON object. If a record was not found or any other error occoured, it is represented in the following format:
```
{
"error": "Invalid credentials"
}
```
Otherwise, the server responds "success"
```
{
"success": ...
}
```

## Available API functions
For the list of available functions please refer to the documented ```functions.php``` file.