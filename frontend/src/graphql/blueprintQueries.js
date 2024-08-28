// src/graphql/blueprintQueries.js
import { gql } from '@apollo/client/core';

// Query to fetch all users
export const QUERY_USER = gql`
  query QueryUser {
    queryUser {
      id
      name
      email
    }
  }
`;

// Query to fetch a specific user by ID
export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
    }
  }
`;
