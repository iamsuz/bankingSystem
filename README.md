#Side Project

##Banking System

This is a project to demonstarate the basic banking structure using GraphQL Server and React Client

##server
	
	You need to install sequelize globally

		npm install sequelize -g

	once its installed then change the configuration in config folder

	Create database banking_system or any preferred name you like

		`"development": {
	    "username": "root",
	    "password": "Your Pwd",
	    "database": "banking_system",
	    "host": "127.0.0.1",
	    "dialect": "mysql"
	  	},`

	Mysql User Password and Db once its been set then 
	`run sequelize db:migrate `
	and wait for the migration to complete then you can start the server

		`node app.js`

		server will start running on port 4000

##client
	
	go to client dir and install the dependencies npm install
	once its complete start the react server 

		`npm run start`

	server will start on localhosl:3000
	
