// README.md
# Fetch-Rewards-BE
## Introduction
This repository hosts the submission by Arun Sivarajah for the Fetch Rewards 2024 Summer Backend Engineering Internship
### Project Support Features
* Users can add, spend and view their points balance
* Public (non-authenticated) users can access all calls on the platform
### Installation Guide
* Clone this repository [here](https://github.com/agsiv25/fetch-rewards-BE.git).
* The main branch is the most stable branch at any given time, ensure you're working from it.
* Run npm install to install all dependencies
### Usage
* Run node . in the terminal to start the application
* If succesful console will log: Listening on port: http://localhost:8000
* Connect to the API using preffered method(Postman, Insomnia, Curl) on port 8000
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /add | Add points to to the users account |
| POST | /spend | Spend points from the users account |
| GET | /balance | View user's points balance |
## POST /add
### Request
`POST /add/`
`curl -d '{ "payer": "DANNON", "points": 300, "timestamp": "2022-10-31T10:00:00Z" }' -H 'Content-Type: application/json' http://localhost:8000/add`
### Response
* None
## POST /spend
### Request
`POST /spend/`
`$ curl -d '{ "points": 5000 }' -H 'Content-Type: application/json' http://localhost:8000/spend`
### Response
`[`
`    {"payer":"DANNON","points":-300},`
`    {"payer":"UNILEVER","points":-200},`
`    {"payer":"DANNON","points":200},`
`    {"payer":"MILLER COORS","points":-4700}`
`]`
## GET /balance
### Request
`GET /balance/`
`$ curl http://localhost:8000/balance`
### Response
`{`
`    "DANNON": 1000,`
`    "UNILEVER": 0,`
`    "MILLER COORS": 5300`
`}`
## Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
## Authors
* [agsiv25](https://github.com/agsiv25)
## License
This project is available for use under the MIT License.