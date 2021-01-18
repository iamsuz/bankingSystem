const express = require('express');
const {graphqlHTTP} = require('express-graphql')

const app = express();

app.use('/api',graphqlHTTP({}))


// initiates the server
app.listen(3000,()=>{
	console.log('Now server is listening on 3000')
})