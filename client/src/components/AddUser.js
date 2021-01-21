import React,{useState} from 'react';

import {useMutation} from '@apollo/client';
import {addUserMutation,getUsersQuery} from '../queries/queries'

function AddUser() {
	const [inputs,setInputs] = useState({
		name:'',
		username:''
	})
  	const [addUser, { data }] = useMutation(addUserMutation);

	return (
		<div>
			<h3>Add User</h3>
			<form
				onSubmit={e => {
				  	e.preventDefault();
				  	addUser({variables:{ name: inputs.name, username:inputs.username},refetchQueries:[{
				  		query:getUsersQuery
				  	}]});
				}}
			>
				<div className='field'>
					<label>Name:</label>
					<input
						type="text"
						value={inputs.name}
					  	onChange={e=>{
					  		setInputs(prevState=>{
					  			return {...prevState,name:e.target.value}
					  		})
					  	}}
					/>
				</div>
				<div className='field'>
					<label>UserName:</label>
					<input
						type="text"
						value={inputs.username}
						onChange={e=>{
					  		setInputs(prevState=>{
					  			return {...prevState,username:e.target.value}
					  		})
						}}
					/>
				</div>
				<button type="submit">Add User</button>
			</form>
	    </div>
	)
}

export default AddUser;
