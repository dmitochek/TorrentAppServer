import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Rutor } from './rutor.js';
import { LoadRutor } from './load.js';
import {InitDownloadingServer} from "./createDownloadingserver.js"

const typeDefs = `
  type Media {
    date: String
    name: String
    file_link: String
    size: String
    error: String
  }

  type Link {
    file_link: String
  }

  type Query {
    getfilm(search: String!): [Media]
    downloadtorrent(link: String!): Boolean
  }
`;



const resolvers = {
  Query: {
    getfilm: (_, { search }) =>
    {
      let rutor = new Rutor(search);
      return rutor.execute();
    },
    downloadtorrent: (_, {link}) =>
    {
      let loadrutor = new LoadRutor(`http://${link}`);
      loadrutor.load();

      return true;
    },
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    {
      async serverWillStart()
      {
        InitDownloadingServer();
      }
    }
  ]
});


const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

//let loadrutor = new LoadRutor("http://d.rutor.info/download/942405");
//await loadrutor.load();
