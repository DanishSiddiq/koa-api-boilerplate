# koa-api-boilerplate - In Progress
Server setup with koa framework basic features

**Description**
* Koa framework based backend api application
* koa-api-problem for error consistency across the application
* mongodb database
* rabbitMQ producer and consumer support - ~~Currently RabbitMQ connection method is commnented while setting up server in app.js~~
* rabbitMQ auto re-connectivity logic after RabbitMQ is down from application
* configurations are in .config.json and local configuration can be override in .config.override.json

#
**Install dependencies:**
* yarn install

#
**Build/Run application:**
* yarn start (for production environment) **/**
* yarn dev (for development environment)

#
**Application health status:**
* information about the application and its health status

**Get:**
```
http://localhost:3133/health
http://localhost:3133/keep-alive
http://localhost:3133/ping
http://localhost:3133/version
```
#
**Student Module:**

* **Post:**
```
http://localhost:3133/api/v1/employee
```
**Body:**
######
```
{
    "firstName": "Danish",
    "lastName": "Siddiq",
    "registrationNumber": 1234567,
    "email": "danish.siddiq@email.com",
    "password": "123456",
    "passwordVerify": "123456"
}
```

#
* **Get:**
```
http://localhost:3133/api/v1/employee
Authorization: Bearer {token}
```

#
* **Put:**
```
http://localhost:3133/api/v1/employee?firstName=danish1&lastName=siddiq1
Authorization: Bearer {token}
```

#
* **Delete:**
```
http://localhost:3133/api/v1/employee
Authorization: Bearer {token}
```

#
**Improvements:**

It is still in progress, feel free to add further features into it

