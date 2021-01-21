import React,{useState} from 'react';

import {useMutation,useQuery} from '@apollo/client';

import {createAccountMutation,getAccountsQuery,getUsersQuery,getBankQuery} from '../queries/queries'


// Get users to diplay in the select form

function DisplayUsers() {
  const {loading,error,data} = useQuery(getUsersQuery);

  if(loading) return <p>loading...</p>
  if(error) return <p>error</p>

  return data.users.map(({id,name,username})=>{
    return (
      <option key={id} value={id}>{name}</option>
      )
  })
}

// get banks to display in the select form

function DisplayBanks() {
  const {loading,error,data} = useQuery(getBankQuery);

  if(loading) return <p>loading...</p>
  if(error) return <p>error</p>

  return data.banks.map(({id,name,address})=>{
    return (
      <option key={id} value={id}>{name}</option>
      )
  })
}

// Create account for the selected user in selected bank

function CreateAccount() {
  const [inputs,setInputs] = useState({
    userId:0,
    bankId:0,
    balance:0
  })

  const [users,setUsers] = useState([])

  const [addAccount, { data }] = useMutation(createAccountMutation);


  return (
    <div>
      <h3>Create Account</h3>
      <form
        onSubmit={e => {
            e.preventDefault();
            addAccount({
              variables:{ 
                userId: inputs.userId, bankId:inputs.bankId,balance:parseInt(inputs.balance)
              },
              refetchQueries:[{
              query:getAccountsQuery
            }]
          });
        }}
      >
        <div className='field'>
          <label>Select User:</label>
          <select onChange={e=>{
                setInputs(prevState=>{
                  return {...prevState,userId:e.target.value}
                })
            }}>
            <option>Select User</option>
            <DisplayUsers />
          </select>
        </div>
        <div className='field'>
          <label>Select Bank:</label>
          <select onChange={e=>{
                setInputs(prevState=>{
                  return {...prevState,bankId:e.target.value}
                })
            }}>
            <option>Select Bank</option>
            <DisplayBanks />
          </select>
        </div>
        <div className='field'>
          <label>Opening Balance:</label>
          <input
            type="number"
            value={inputs.balance}
            onChange={e=>{
                setInputs(prevState=>{
                  return {...prevState,balance:e.target.value}
                })
            }}
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
      </div>
  )
}

export default CreateAccount;
