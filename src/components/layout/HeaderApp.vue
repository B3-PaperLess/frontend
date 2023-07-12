<template>
  <div class="flex flex-row justify-between align-middle w-full pl-6 pr-2 bg-base-lg h-16">
    <div class="flex items-start align-middle h-fit mt-2">
      <router-link :to="{name: 'index'}">
        <mini-logo class="w-32"></mini-logo>
      </router-link>
    </div>

    <button-default v-if="isConnected" @click="$router.push({name: 'home'})">
      Nom
    </button-default>

    <button-default v-else class="px-2 my-2" @click="$router.push({name: 'connexion'})">
      connexion
    </button-default>
  </div>
</template>

<script>
import MiniLogo from '@/components/icons/MiniLogo.vue'
import ButtonDefault from "@/components/ButtonDefault.vue";


export default {
  name: "HeaderApp",
  components: {
    ButtonDefault,
    MiniLogo
  },
  data() {
    return {
      srcImage: require("@/assets/image/offline.png"),
      isConnected: false,
    }
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