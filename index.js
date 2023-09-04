import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Rutor } from './rutor.js';

const typeDefs = `
  type Media {
    title: String
    link: String
  }

  type Query {
    getfilm(search: String!): [Media]
  }
`;



const resolvers = {
  Query: {
    getfilm: (_, { search }) =>
    {
      console.log(search);
      let rutor = new Rutor(search);
      return rutor.execute();
    },
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);