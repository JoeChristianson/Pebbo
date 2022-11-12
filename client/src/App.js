import {ContextProvider} from "./context/context"

import './App.css';
import Header from "./components/Header"
import Main from "./components/Main"
import AuthComponent from './components/Auth';
import {useState,useEffect} from "react"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import auth from "./utils/auth"
import { BrowserRouter } from 'react-router-dom';
import BottomNav from './components/BottomNav/index.tsx';

const httpLink = createHttpLink({
  // toggle for production/absolute path for development
  uri: 'http://localhost:3001/graphql'
  // uri: '/graphql'
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
  const [hideHeader,setHideHeader] = useState(false)
  const loggedIn = auth.loggedIn()
  const [isMobile,setIsMobile] = useState(false)
  useEffect(()=>{
      const width = window.screen.width
      setIsMobile(width<700)
  },[])

  return (
    <BrowserRouter>
    <ApolloProvider client={client}>
    <ContextProvider>

    {!loggedIn?<AuthComponent/>:
    
    <div className="App">
      {!isMobile&&<Header hideHeader={hideHeader} setCurrentSection={setCurrentSection}></Header>}
      <Main setHideHeader={setHideHeader} currentSection={currentSection}></Main>
      {isMobile&&<BottomNav></BottomNav>}
    </div>
  }

  </ContextProvider>
    </ApolloProvider>
  </BrowserRouter>
  );
}

export default App;
