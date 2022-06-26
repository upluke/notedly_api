// const express=require('express');
// const {ApolloServer, gql} = require('apollo-server-express')


// // Run the server on a port specified in our .env file or port 4000
// const port=process.env.PORT || 4000;

// // construct a schema, using GraphQL's schema language
// const typeDefs=gql`
//     type Query{
//         hello: String 
//     }
// `
// // provide resolver funcitons for our schema fields
// const resolvers={
//     Query:{
//         hello: ()=>'hello world'
//     }
// }


// const app= express()

// // Apollo Server setup
// const server = new ApolloServer({typeDefs, resolvers})

// // Apply the Apollo GraphQL middleware and set the path to /api
// server.applyMiddleware({app, path:'/api'})

 

// // app.get('/', (req, res)=> res.send('Hello Note again'))

 
// app.listen(port, ()=> console.log(`Server running at http://localhost:${port}`))

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");

const app = express();

const typeDefs = `
    type Query{
        totalPosts: Int!
    }
`;
const resolvers = {
    Query: {
        totalPosts: () => 100,
    },
};
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();
const httpserver = http.createServer(app);

app.get("/rest", function (req, res) {
    res.json({ data: "api working" });
});

app.listen(4000, function () {
    console.log(`server running on port 4000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});