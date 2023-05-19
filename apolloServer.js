const { ApolloServer, gql } = require("apollo-server-express");
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("./backend/book");
const { check, body, validationResult } = require("express-validator");

const typeDefs = gql`
  type Book {
    id: String!
    title: String!
    publicationYear: Int
    author: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    books: [Book!]!
    book(id: String!): Book
  }

  input BookInput {
    title: String!
    publicationYear: Int
    author: String!
  }

  type Mutation {
    createBook(data: BookInput!): Book!
    updateBook(id: String!, data: BookInput!): Book!
    deleteBook(id: String!): Book
  }
`;

const resolvers = {
  Query: {
    books: () => getBooks(),
    book: (_, { id }) => getBook(id),
  },
  Mutation: {
    createBook: (_, { data }) => createBook(data),
    updateBook: (_, { id, data }) => updateBook(id, data),
    deleteBook: (_, { id }) => deleteBook(id),
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

module.exports = apolloServer;
