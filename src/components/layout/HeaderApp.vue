<template>
  <div class="flex flex-row justify-between align-middle w-full pl-6 pr-2 bg-base-lg h-16">
    <div class="flex items-start align-middle h-fit mt-2">
      <router-link :to="{name: 'index'}">
        <mini-logo class="w-32"></mini-logo>
      </router-link>
    </div>

    <div v-if="user.isLogged">
      Bonjour {{ user.nom }}   {{user.prenom}}
    </div>

    <button-default v-if="user.isLogged" @click="logout">
      Déconnexion
    </button-default>

    <button-default v-else class="px-2 my-2" @click="$router.push({name: 'connexion'})">
      Connexion
    </button-default>
  </div>
</template>

<script setup>
import MiniLogo from '@/components/icons/MiniLogo.vue'
import ButtonDefault from "@/components/ButtonDefault.vue";
import {ref} from "vue";
import useUserStore from '@/store/user'


const srcImage = ref(require("@/assets/image/offline.png"))
const user = useUserStore.getters.getUser


function logout() {
  useUserStore.dispatch('logout')
}
</script>

<script>


export default {
  name: "HeaderApp",
  data() {
  }
}
</script>

<style scoped>

.navBar {
  display: flex;
  flex-direction: row;
}

.leftSide {
  display: flex;
  justify-content: start;

}

.imgProfil {
  width: 50%;
  height: 50%;
  border-radius: 100%;
}
</style>