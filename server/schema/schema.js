const graphql = require('graphql');

const _ = require('lodash');

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLBoolean,GraphQLDate} = graphql;
const { Op,DATE } = require("sequelize");

const User = require('../models/User');
const Account = require('../models/Account');
const Bank = require('../models/Bank');
const Transaction = require('../models/Transaction');

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
		id:{type:GraphQLID},
		number:{type:GraphQLID},
		balance:{type:GraphQLInt},
		createdAt:{
			type:GraphQLString
		},
		updatedAt:{
			type:GraphQLString
		},
		user:{
			type: UserType,
			resolve(parent,args){
				//return _.find(users,{id: parent.userId})
				return User.findOne({
					where:{
						id:parent.userId
					}
				})
			}
		},
		bank:{
			type:BankType,
			resolve(parent,args){
				//return _.find(banks,{id:parent.bankId})
				return Bank.findOne({
					where:{
						id:parent.bankId
					}
				})
			}
		},
		transactions:{
			type: new GraphQLList(TransactionType),
			resolve(parent,args){
				return Transaction.findAll({
					where:{
						[Op.or]:{
							from:parent.id,
							to:parent.id
						}
					}
				})
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
				//return _.filter(accounts,{userId:parent.id})
				return Account.findAll({
					where:{
						userId:parent.id
					}
				})
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
				//return _.find(accounts,{number:parent.from})
				return Account.findOne({
					where:{
						number:parent.from
					}
				})
			}
		},
		to:{
			type:AccountType,
			description:'To account number',
			resolve(parent,args){
				//return _.find(accounts,{number:parent.to})
				return Account.findOne({
					where:{
						number:parent.to
					}
				})
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
				return Bank.findOne({
					where:{
						id:args.id
					}
				})
			}
		},
		account:{
			type: AccountType,
			args:{number:{type:GraphQLID}},
			resolve(parent,args){
				//return _.find(accounts,{number:args.number})
				return Account.findOne({
					where:{
						number:args.number
					}
				})
			}
		},
		user:{
			type: UserType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				// returns data from DB
				return User.findOne({
					where:{
						id:args.id
					}
				})
			}
		},
		transaction:{
			type:TransactionType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				return Transaction.findOne({
					where:{
						id:args.id
					}
				})
			}
		},
		users:{
			type:new GraphQLList(UserType),
			resolve(parent,args){
				return User.findAll()
			}
		},
		banks:{
			type: new GraphQLList(BankType),
			resolve(parent,args){
				return Bank.findAll()
			}
		},
		accounts:{
			type: new GraphQLList(AccountType),
			resolve(parent,args){
				return Account.findAll()
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
				return User.create({
					name:args.name,
					username: args.username
				})
			}
		},
		addBank:{
			type:BankType,
			args:{
				name:{type:GraphQLString},
				address:{type:GraphQLString}
			},
			resolve(parent,args){
				return Bank.create({
					name:args.name,
					address:args.address
				})
			}
		},
		createAccount:{
			type:AccountType,
			description:"Account number will be auto generate and balance will be default zero but you can add balance at the start of opening account",
			args:{
				userId:{type:GraphQLID},
				bankId:{type:GraphQLID},
				balance:{type:GraphQLInt}
			},
			resolve(parent,args){
				const accountNumber = Math.floor(Math.random()*100000000);
				return Account.create({
					number:accountNumber,
					userId:args.userId,
					bankId:args.bankId,
					balance:args.balance
				})
			}
		},
		createTransaction:{
			type:TransactionType,
			description:'From and To are the Account Numbers',
			args:{
				from:{type:GraphQLID},
				to:{type:GraphQLID},
				amount:{type:GraphQLInt}
			},
			resolve(parent,args){
				console.log(args);
				return Account.findOne({
					where:{
						id:args.from
					}
				}).then(account=>{
					account.update({balance: account.dataValues.balance - args.amount})
					if(account.dataValues.balance >= args.amount){
						Account.findOne({
							where:{
								id:args.to
							}
						}).then(toAcc=>{
							toAcc.update({
								balance: toAcc.dataValues.balance + args.amount
							})
							return Transaction.create({
								type:0,
								from:account.id,
								to:toAcc.id,
								amount:args.amount
							})
						})
					}else{
						throw new Error(`${args.from} Account does not have enough balance`)
					}
				}).catch(err=>{
					return err;
				})
				
			}
		},
		creditTransaction:{
			type:TransactionType,
			description:"Credit transaction is only to deposit money to selected account",
			args:{
				to:{type:GraphQLID},
				amount:{type:GraphQLInt}
			},
			resolve(parent,args){
				console.log(args.to)
				return Account.findOne({
					where:{
						id:args.to
					}
				}).then(account=>{
					console.log(account)
					if(args.amount > 0){
						account.update({
							balance: account.dataValues.balance + args.amount
						})
						return Transaction.create({
							type:1,
							from:null,
							to:args.to,
							amount:args.amount
						})
					}else{
						throw new Error(`${args.amount} amount is not valid`)
					}
				}).catch(err=>{
					return err;
				})
			}
		}
	}
})


module.exports = new GraphQLSchema({
	query:RootQuery,
	mutation:Mutation
})