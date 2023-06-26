<template>
  <div class="flex flex-row justify-between align-middle w-full py-2 px-6 bg-base-lg">
    <div class="flex items-start align-middle h-fit">
      <router-link :to="{name: 'index'}">
        <mini-logo></mini-logo>
      </router-link>
    </div>

    <div class="flex items-end">
      <router-link :to="{name: 'connexion'}">
        <v-avatar :image="srcImage" size="75"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import MiniLogo from '@/components/icons/MiniLogo.vue'


export default {
  name: "HeaderApp",
  components: {
    MiniLogo
  },
  data() {
    return {
      srcImage: require("@/assets/image/offline.png")
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