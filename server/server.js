const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// comment this in for production
if (PORT!==3001){
  app.get("*", (req, res) => {
    
    let url = path.join(__dirname, '../client/build', 'index.html');
    if (!url.startsWith('/app/'))
    url = url.substring(1);
    res.sendFile(url);
  });
}
 
 
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      
      
    }) 
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
  // C:\Users\jcfar\OneDrive\Desktop\Current Projects\HABD\client