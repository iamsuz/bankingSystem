import React,{useState} from 'react';

import {useMutation,useQuery} from '@apollo/client';

import {createAccountMutation,getAccountsQuery,getUsersQuery,getBankQuery,creditTransactionMutation} from '../queries/queries'


function Accounts() {
  const {loading,error,data} = useQuery(getAccountsQuery);

  if(loading) return <p>loading...</p>
  if(error) return <p>error</p>

  return data.accounts.map(({id,number,balance,user})=>{
    return (
      <option key={id} value={id}>{user.name} {balance}</option>
      )
  })
}


function CreditTransactions() {
  const [inputs,setInputs] = useState({
    amount:0,
    to:0
  })

  const [users,setUsers] = useState([])

  const [makeTransaction, { data }] = useMutation(creditTransactionMutation);


  return (
    <div>
      <h3>Credit Transaction(Deposit)</h3>
      <form
        onSubmit={e => {
            e.preventDefault();
            makeTransaction({
              variables:{ 
                amount:parseInt(inputs.amount),to:inputs.to
              },
              refetchQueries:[{
              query:getAccountsQuery
            }]
          });
        }}
      >
        <div className='field'>
          <label>To Account:</label>
          <select onChange={e=>{
                setInputs(prevState=>{
                  return {...prevState,to:e.target.value}
                })
            }}>
            <option>Select Account</option>
            <Accounts />
          </select>
        </div>
        <div className='field'>
          <label>Add Balance:</label>
          <input
            type="number"
            value={inputs.amount}
            onChange={e=>{
                setInputs(prevState=>{
                  return {...prevState,amount:e.target.value}
                })
            }}
          />
        </div>
        <button type="submit">Make Transaction</button>
      </form>
      </div>
  )
}

export default CreditTransactions;
