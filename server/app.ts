const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

// Allow cross origin requests
app.use(cors());


// connect to the mysql database
require('./db');


// middleware for graphql
app.use('/api',graphqlHTTP({
	schema,
	graphiql:true
}))


// initiates the server
app.listen(4000,()=>{
	console.log('Now server is listening on 4000')
})