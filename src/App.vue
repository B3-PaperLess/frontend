<template>
  <div class="flex flex-col min-h-screen w-full">
    <header class="w-full">
      <header-app></header-app>
    </header>

    <main class="flex-grow w-full h-full bg-cream">
      <router-view></router-view>
    </main>

    <footer class="w-full">
      <footer-app></footer-app>
    </footer>
  </div>
</template>

<script>
import HeaderApp from './components/layout/HeaderApp.vue'
import FooterApp from './components/layout/FooterApp.vue'
import axios from './axiosConfig'
export default {
  name: 'App',
  components: {
    HeaderApp,
    FooterApp
  },
  // created() {
  //     axios.get('').then((res) => {
  //       console.log(res)
  //     })
  // }
}
</script>

<style scoped>

</style>
