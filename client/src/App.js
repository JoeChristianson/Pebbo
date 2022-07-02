import './App.css';
import Header from "./components/Header"
import Main from "./components/Main"
import AuthComponent from './components/Auth';
import {useState} from "react"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import auth from "./utils/auth"

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [currentSection,setCurrentSection] = useState("dash")

  const loggedIn = auth.loggedIn()
  console.log(loggedIn)

  return (
    <ApolloProvider client={client}>
    {!loggedIn?<AuthComponent/>:
    
    <div className="App">
      <Header setCurrentSection={setCurrentSection}></Header>
      <Main currentSection={currentSection}></Main>
    </div>
  }
    </ApolloProvider>
  );
}

export default App;
