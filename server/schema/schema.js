const graphql = require('graphql');

const _ = require('lodash');

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLBoolean} = graphql;

const users = require('../models/User');
const accounts = require('../models/Account');
const banks = require('../models/Bank');
const transactions = require('../models/Transaction');

// var users = [
// {name:'Sujit M',username:'iamsujit',id:'1'},
// {name:'Sujit Ma',username:'sujit',id:'2'},
// {name:'Sujit Mahavar',username:'iamjit',id:'3'}
// ]

// var accounts = [
// 	{number: '1',balance:1000,userId:'1',bankId:'1'},
// 	{number: '2',balance:900,userId:'2',bankId:'2'},
// 	{number: '3',balance:1100,userId:'3',bankId:'1'},
// 	{number: '4',balance:1000,userId:'2',bankId:'2'},
// 	{number: '5',balance:1000,userId:'1',bankId:'1'},
// 	{number: '6',balance:1000,userId:'1',bankId:'1'},
// ]

// var banks = [
// 	{name:'icici',address:'Pune',id:'1'},
// 	{name:'Axis',address:'Mumbai',id:'2'}
// ]

// var transaction = [
// 	{id:'1',type:0,from:'2',to:'3',amount:100}
// ]

const BankType = new GraphQLObjectType({
	name:'Bank',
	description:'List of all the Banks',
	fields:()=>({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		address: {type: GraphQLString}
	})
})

const AccountType = new GraphQLObjectType({
	name:'Account',
	fields:()=>({
		number:{type:GraphQLID},
		balance:{type:GraphQLInt},
		user:{
			type: UserType,
			resolve(parent,args){
				return _.find(users,{id: parent.userId})
			}
		},
		bank:{
			type:BankType,
			resolve(parent,args){
				return _.find(banks,{id:parent.bankId})
			}
		}
	})
})

const UserType = new GraphQLObjectType({
	name:'User',
	fields:()=>({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		username: {type: GraphQLString},
		accounts:{
			type: new GraphQLList(AccountType),
			resolve(parent,args){
				return _.filter(accounts,{userId:parent.id})
			}
		}
	})
})

const TransactionType = new GraphQLObjectType({
	name:'Transaction',
	fields:()=>({
		id:{type:GraphQLID},
		type:{
			description:'Type is either debit or credit so boolean was one option but graphql responds with false or true not 0 or 1 so string will be another where debit will be default',
			type:GraphQLString 
		},
		from:{
			type:AccountType,
			description:'From account number',
			resolve(parent,args){
				console.log(parent)
				return _.find(accounts,{number:parent.from})
			}
		},
		to:{
			type:AccountType,
			description:'To account number',
			resolve(parent,args){
				console.log(parent)
				return _.find(accounts,{number:parent.to})
			}
		},
		amount:{
			description:'amount needs to be default 0 not null',
			type:GraphQLInt
		}
	})
})


const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields:{
		bank:{
			type: BankType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				// returns data from DB
				return _.find(banks,{id:args.id})
			}
		},
		account:{
			type: AccountType,
			args:{number:{type:GraphQLID}},
			resolve(parent,args){
				return _.find(accounts,{number:args.number})
			}
		},
		user:{
			type: UserType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				// returns data from DB
				return _.find(users,{id:args.id})
			}
		},
		transaction:{
			type:TransactionType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				return _.find(transaction,{id:args.id})
			}
		}
	}	
})


const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields:{
		addUser:{
			type:UserType,
			args:{
				name:{type:GraphQLString},
				username:{type:GraphQLString}
			},
			resolve(parent,args){
				let user = new User({
					name:args.name,
					username: args.username
				})
			}
		}
	}
})


module.exports = new GraphQLSchema({
	query:RootQuery
})