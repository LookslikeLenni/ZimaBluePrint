// src/stores/dataStore.js

import { defineStore } from 'pinia';
import { ref } from 'vue';
import apolloClient from '../apollo-client';
import { QUERY_USER, GET_USER } from '../graphql/blueprintQueries'; // Updated import path
import { ADD_USER } from '../graphql/blueprintMutations';

export const useDataStore = defineStore('dataStore', () => {
  const users = ref([]);
  const loading = ref(false);

  // Fetch all users
  const fetchUsers = async () => {
    loading.value = true;
    try {
      const { data } = await apolloClient.query({
        query: QUERY_USER, // Correct query for fetching all users
      });
      users.value = data.queryUser; // Update to match the correct response structure
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      loading.value = false;
    }
  };

  // Fetch a specific user by ID
  const fetchUserById = async (id) => {
    if (!id) {
      console.error('ID must be provided to fetch a specific user.');
      return;
    }
    loading.value = true;
    try {
      const { data } = await apolloClient.query({
        query: GET_USER,
        variables: { id }, // Pass the ID to fetch a specific user
      });
      users.value = data.getUser ? [data.getUser] : []; // Handle null result
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      loading.value = false;
    }
  };

  const addUser = async (userData) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: ADD_USER,
        variables: {
          input: [userData], // Pass as an array
        },
      });

      users.value.push(data.addUser.user); // Ensure this matches the mutation response structure
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return { users, loading, fetchUsers, fetchUserById, addUser };
});
