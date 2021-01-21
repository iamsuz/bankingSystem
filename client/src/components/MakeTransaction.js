import React,{useState} from 'react';

import {useMutation,useQuery} from '@apollo/client';

import {createAccountMutation,getAccountsQuery,getUsersQuery,getBankQuery,createTransactionMutation} from '../queries/queries'


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


function MakeTransactions() {
  const [inputs,setInputs] = useState({
    amount:0,
    from:0,
    to:0
  })

  const [users,setUsers] = useState([])

  const [makeTransaction, { data }] = useMutation(createTransactionMutation);


  return (
    <div>
      <h3>Make Transaction</h3>
      <form
        onSubmit={e => {
            e.preventDefault();
            makeTransaction({
              variables:{ 
                amount:parseInt(inputs.amount),from:inputs.from,to:inputs.to
              },
              refetchQueries:[{
              query:getAccountsQuery
            }]
          });
        }}
      >
        <div className='field'>
          <label>From Account:</label>
          <select onChange={e=>{
                setInputs(prevState=>{
                  return {...prevState,from:e.target.value}
                })
            }}>
            <option>Select User</option>
            <Accounts />
          </select>
        </div>
        <div className='field'>
          <label>To Account:</label>
          <select onChange={e=>{
                setInputs(prevState=>{
                  return {...prevState,to:e.target.value}
                })
            }}>
            <option>Select Bank</option>
            <Accounts />
          </select>
        </div>
        <div className='field'>
          <label>Opening Balance:</label>
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

export default MakeTransactions;
