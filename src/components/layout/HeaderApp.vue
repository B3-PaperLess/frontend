<template>
  <div class="flex flex-row justify-between align-middle w-full pl-6 pr-2 bg-base-lg h-16">
    <div class="flex items-start align-middle h-fit mt-2">
      <router-link v-if="!user.isLogged" :to="{name: 'index'}">
        <mini-logo class="w-32"></mini-logo>
      </router-link>

      <router-link v-else :to="{name: 'home'}">
      <mini-logo class="w-32"></mini-logo>
      </router-link>
    </div>

    <div v-if="user.isLogged">
      Bonjour {{user.prenom}} {{ user.nom }}   
    </div>

    <div class="flex gap-x-12 my-2">
      <button-default v-if="user.isAdmin" class="w-32 px-4 py-2" @click="$router.push({name: 'admin'})"> Panel Admin </button-default>

      <button-default v-if="user.isLogged"  class="px-4 py-2" @click="logout">
        Deconnexion
      </button-default>

      <button-default v-else class="px-4 py-2" @click="$router.push({name: 'connexion'})">
        connexion
      </button-default>
    </div>

  </div>
</template>

<script setup>
import MiniLogo from '@/components/icons/MiniLogo.vue'
import ButtonDefault from "@/components/ButtonDefault.vue";
import {ref} from "vue";
import useUserStore from '@/store/user'
import {useRouter} from "vue-router";

const router = useRouter()


const srcImage = ref(require("@/assets/image/offline.png"))
const user = useUserStore.getters.getUser

function logout() {
  useUserStore.dispatch('logout')
  router.push({name: 'index'})

}
</script>

<script>


export default {
  name: "HeaderApp",
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