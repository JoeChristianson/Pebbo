const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const {User} = require("../server/models/User")
const fs = require("fs")
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { fstat } = require('fs');
const cors = require("cors");
const textReminders = require("./texting/index.js")
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
app.use(cors())
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

app.get("/api/export", async (req,res)=>{
  const {userId} = req.query
  const user = await User.findById(userId)
  console.log("being pinged");
  res.json(user)
  // await fs.writeFile(`./files/${userId}.json`,JSON.stringify(user),()=>{})
  // res.sendFile(`${__dirname}/files/${userId}.json`,(err)=>{
  //   if(err){
  //     console.error(err)
  //   }
  // })
})

 
 
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  try{

    
    await server.start();
    server.applyMiddleware({ app });
    
    db.once('open', () => {
      app.listen(PORT, () => {
      }) 
      textReminders()
    })
  }catch(err){
    console.error(err)
  }
  };
  
  // Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
  // C:\Users\jcfar\OneDrive\Desktop\Current Projects\HABD\client