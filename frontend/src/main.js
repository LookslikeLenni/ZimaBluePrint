// main.js
import './assets/main.css';

import { createApp, provide, h } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './apollo-client'; // Ensure this path is correct
import router from './router';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(createPinia());
app.use(router);

app.mount('#app');
