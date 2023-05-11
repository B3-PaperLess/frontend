import { createApp } from "vue";
import { createStore } from "vuex";
import axios from '../axiosConfig'
const store = createStore({
  state: {
    count: 0,
  },
});
const app = createApp();
app.use(store);
app.mount("#app")