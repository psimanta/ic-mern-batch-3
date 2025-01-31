# CRUD Operations and REST API Methods

## CRUD Operations

CRUD stands for Create, Read, Update, and Delete. These are the four basic operations for managing data in a database or a persistent storage system.

- **Create**: Add new data or records.
- **Read**: Retrieve existing data or records.
- **Update**: Modify existing data or records.
- **Delete**: Remove existing data or records.

## REST API Methods

REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol -- the HTTP protocol is almost always used.

### Common HTTP Methods in REST

- **GET**: Retrieve data from the server. It is used to read a resource.
- **POST**: Send data to the server to create a new resource.
- **PUT**: Update an existing resource on the server.
- **DELETE**: Remove a resource from the server.

### Example Mapping of CRUD to REST

- **Create**: `POST /resource`
- **Read**: `GET /resource` or `GET /resource/{id}`
- **Update**: `PUT /resource/{id}`
- **Delete**: `DELETE /resource/{id}`

## Conclusion

Understanding CRUD operations and REST API methods is fundamental for building and interacting with web services. These concepts form the backbone of modern web development, enabling developers to create scalable and maintainable applications.
