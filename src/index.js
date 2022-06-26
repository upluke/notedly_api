const express=require('express');
const {ApolloServer, gql} = require('apollo-server-express')
const app= express()

// Run the server on a port specified in our .env file or port 4000
const port=process.env.PORT || 4000;

// construct a schema, using GraphQL's schema language
const typeDefs=gql`
    type Query{
        hello: String 
    }
`
// provide resolver funcitons for our schema fields
const resolvers={
    Query:{
        hello: ()=>'hello world'
    }
}


// Apollo Server setup
async function startApolloServer() {
    const server = new ApolloServer({typeDefs, resolvers})
    await server.start()
   
    server.applyMiddleware({app, path:'/api'})

}

startApolloServer()
// Apply the Apollo GraphQL middleware and set the path to /api


 

app.get('/', (req, res)=> res.send('update server format!'))

app.listen(port, ()=> console.log(`Server running at http://localhost:${port}`))
 