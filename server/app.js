const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')

const app = express();

// connect to the mysql database
require('./db');


// middleware for graphql
app.use('/api',graphqlHTTP({
	schema,
	graphiql:true
}))


// initiates the server
app.listen(3000,()=>{
	console.log('Now server is listening on 3000')
})