import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Rutor } from './rutor.js';
import { LoadRutor } from './load.js';
import { InitDownloadingServer } from "./createDownloadingserver.js";
import fs from 'fs';

const typeDefs = `
  type Media {
    date: String
    name: String
    file_link: String
    size: String
    error: String
    seeders: Int
    lichers: Int
  }

  type Link {
    file_link: String
  }

  type Query {
    getfilm(search: String!): [Media]
    downloadtorrent(link: String!): String
    getcategoryfilms(category: Int!): [Media]
  }
`;



const resolvers = {
  Query: {
    getfilm: (_, { search }) =>
    {
      let rutor = new Rutor(search, null);
      return rutor.execute();
    },
    downloadtorrent: async (_, { link }) =>
    {
      let loadrutor = new LoadRutor(`http://${link}`);
      await loadrutor.load();
      return "http://10.0.2.2:3000/download/" + link.substring(link.lastIndexOf("/") + 1) + ".torrent";
    },
    getcategoryfilms: (_, { category }) =>
    {
      let rutor = new Rutor(null, category);
      return rutor.execute();
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
