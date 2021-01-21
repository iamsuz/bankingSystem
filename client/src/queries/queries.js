import {useQuery, gql,useMutation} from '@apollo/client';

const addUserMutation = gql`
	mutation($name: String!,$username:String!){
		addUser(name:$name,username:$username){
			name
			id
		}
	}
`;

const getUsersQuery = gql`
	{
		users{
			id
			name
			username
		}
	}
`;

const createAccountMutation = gql`
  	mutation($userId:ID!,$bankId:ID!,$balance:Int!){
	    createAccount(userId:$userId,bankId:$bankId,balance:$balance){
	      	balance
	    }
  }
`;

const getAccountsQuery = gql`
	{
		accounts{
			id
			number
			balance
			createdAt
			user{
				name
			}
		}
	}
`;

const getBankQuery = gql`
	{
		banks{
			id
			name
			address
		}
	}
`

const createTransactionMutation = gql`
	mutation($amount:Int!,$from:ID!,$to:ID!){
		createTransaction(amount:$amount,from:$from,to:$to){
			amount
		}
	}
`

const creditTransactionMutation = gql`
	mutation($amount:Int!,$to:ID!){
		creditTransaction(amount:$amount,to:$to){
			amount
		}
	}
`

export {addUserMutation,getUsersQuery,createAccountMutation,getAccountsQuery,getBankQuery,createTransactionMutation,creditTransactionMutation};