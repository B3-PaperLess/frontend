import { createStore } from "vuex";
import axios from "../axiosConfig"

const store = createStore({
  state() {
    return {
      // État initial du store
    };
  },
  mutations: {
    // Mutations pour modifier l'état du store
  },
  actions: {
    // Actions pour effectuer des opérations asynchrones
    async firstRequest(_, {id, test}) {
      console.log(id);
      console.log(test);
      await axios.post('/test/', { id: id, test: test })
    }
  },
  getters: {
    // Getters pour accéder aux données du store
  },
  modules: {
    // Modules supplémentaires (si nécessaire)
  },
});

export default store;