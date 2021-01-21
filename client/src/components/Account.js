import React from 'react';

import {useQuery} from '@apollo/client';

import {getAccountsQuery} from '../queries/queries'

function GetUsers() {
	const {loading,error,data} = useQuery(getAccountsQuery);

	if(loading) return <p>loading...</p>
	if(error) return <p>error</p>


	return data.accounts.map(({id,number,balance,createdAt,user})=>(
			<li key={id}>
				<span>{user.name} </span>
				<span> Account number {number}  created at {Date(createdAt)}</span>
			</li>
			))
	
}

function Account() {
	return (
		<div>
		<h2>List of Accounts</h2>
		<ul>
			<GetUsers />
		</ul>
		</div>
	)
}

export default Account;
