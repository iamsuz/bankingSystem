import React,{Component} from 'react';

import {useQuery, gql} from '@apollo/client';

const getBanksQuery = gql`
	{
		banks{
			id
			name
			address
		}
	}
`;

function GetBanks() {
	const {loading,error,data} = useQuery(getUsersQuery);

	if(loading) return <p>loading...</p>
	if(error) return <p>error</p>

	return data.banks.map(({id,name,address})=>(
			<li key={id}>
				{name}
			</li>
			))
	
}

function Bank() {
	return (
		<ul>
			<GetBanks />
		</ul>
	)
}

export default Bank;
