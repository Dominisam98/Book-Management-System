import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query {
    books {
      id
      title
      publicationYear
      author 
      createdAt 
      updatedAt
    }
  } 
`; 

export const GET_BOOK = gql`
  query GetBook($id: String!) {
    book(id: $id) {
      id
      title
      publicationYear
      author
      createdAt
      updatedAt
    }
  }
`;
