# Chatppl
It is a Node.js sever for application an Hybrid Application [Chatppl]( https://github.com/khanani92/Chatppl/) , it provide REST API for that applicaiton. 
# Development Environment Setup

 Pre-requisites:
 -  Node.js
 - MongoDB

Install **MongoDB**  and  **NodeJS** x64 distributions from its websites.

# Runing Application.
 
Move to the Project Directry

```bash
$cd projectDirectry
```

- Installing all the Dependencies 
 
```bash
$npm install
```

- Adding MongoDb URL for DataBase Conntection
Move to project folder then
```bash
$cd app/model/
```
Then open the dbCollection.js file and put your data base URL 
```bash
  mongoose.connect('Data base URL');
```
-	Setting up the API key
Move to project folder then
```bash
$ cd app/Config/ 
```
Then open the Config.js file and put your own apiKey
```bash
"encrypt_key"   : 'API key'
```
- Running in Project
Move to project folder then
```bash
$ node server.js
```
 - Server is Developed on localhost:8080
 - Add API key in the header when hitting an API

#License
MIT
