import React from 'react';

import {useQuery} from '@apollo/client';

import {getUsersQuery} from '../queries/queries'

function GetUsers() {
	const {loading,error,data} = useQuery(getUsersQuery);

	if(loading) return <p>loading...</p>
	if(error) return <p>error</p>

	return data.users.map(({id,name,username})=>(
			<li key={id}>
				{name}
			</li>
			))
	
}

function User() {
	return (
		<ul>
			<GetUsers />
		</ul>
	)
}

export default User;
