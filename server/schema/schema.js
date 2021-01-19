const graphql = require('graphql');

const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;

const UserType = new GraphQLObjectType({
	name:'User',
	fields:()=>({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		username: {type: GraphQLString}
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields:{
		user:{
			type: UserType,
			args:{id:{type:GraphQLString}},
			resolve(parent,args){
				// returns data from DB
			}
		}
	}	
})


module.exports = new GraphQLSchema({
	query:RootQuery
})