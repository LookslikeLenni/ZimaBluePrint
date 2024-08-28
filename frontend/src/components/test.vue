<!-- src/components/Test.vue -->
<template>
  <div>
    <h1>Users</h1>
    <button @click="loadUsers">Load All Users</button>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">{{ user.name }} - {{ user.email }}</li>
    </ul>
    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <button @click="addNewUser">Add User</button>
    <input v-model="userId" placeholder="User ID" />
    <button @click="loadUserById">Load User by ID</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDataStore } from '../stores/dataStore';
import { storeToRefs } from 'pinia';

const name = ref('');
const email = ref('');
const userId = ref(''); // To hold the user ID for specific fetch
const dataStore = useDataStore();
const { users, loading } = storeToRefs(dataStore);

const loadUsers = () => {
  console.log('Loading all users...');
  dataStore.fetchUsers();
};

const loadUserById = () => {
  if (userId.value) {
    console.log(`Loading user with ID: ${userId.value}`);
    dataStore.fetchUserById(userId.value);
  } else {
    console.log('Please enter a user ID to fetch.');
  }
};

const addNewUser = () => {
  if (name.value && email.value) {
    console.log(`Adding new user: Name - ${name.value}, Email - ${email.value}`);
    dataStore.addUser({ name: name.value, email: email.value });
  }
};
</script>
