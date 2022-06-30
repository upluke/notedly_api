const express=require('express');
const {ApolloServer, gql} = require('apollo-server-express')
const app= express()

// Run the server on a port specified in our .env file or port 4000
const port=process.env.PORT || 4000;

let notes = [
    {
      id: '1',
      content: 'This is a note',
      author: 'Adam Scott'
    },
    {
      id: '2',
      content: 'This is another note',
      author: 'Harlow Everly'
    },
    {
      id: '3',
      content: 'Oh hey look, another note!',
      author: 'Riley Harrison'
    }
  ];

// construct a schema, using GraphQL's schema language
const typeDefs = gql`
  type Note {
    id: ID
    content: String
    author: String
  }
  type Query {
    hello: String
    notes: [Note]
    note(id: ID): Note
  }
  type Mutation {
    newNote(content: String!): Note
  }
`;
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
 