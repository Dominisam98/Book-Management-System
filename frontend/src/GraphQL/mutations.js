import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook($data: BookInput!) {
    createBook(data: $data) {
      id
      title
      publicationYear
      author
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: String!, $data: BookInput!) {
    updateBook(id: $id, data: $data) {
      id
      title
      publicationYear
      author
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: String!) {
    deleteBook(id: $id) {
      id
      title
      publicationYear
      author
    }
  }
`;
