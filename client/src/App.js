import React from 'react';
import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client';

// Components
import User from './components/User'
import AddUser from './components/AddUser'
import Account from './components/Account'
import CreateAccount from './components/CreateAccount'
import MakeTransaction from './components/MakeTransaction'
import CreditTransaction from './components/CreditTransaction'

// Apollow client setup
//which will make graphql queries

const client = new ApolloClient({
  uri:'http://localhost:4000/api',
  cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Banking System</h1>
        <User /> 
        <AddUser />
        <Account />
        <CreateAccount />
        <MakeTransaction />
        <CreditTransaction />
      </div>
    </ApolloProvider>
  );
}

export default App;
