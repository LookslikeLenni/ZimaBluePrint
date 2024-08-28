// blueprintMutations.js
import { gql } from '@apollo/client/core';

export const ADD_USER = gql`
  mutation AddUser($input: [AddUserInput!]!) {
    addUser(input: $input) {
      user {  # Assuming 'users' is a list of the newly added users
        id
        name
        email
      }
    }
  }
`;
