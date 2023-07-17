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

<script setup>
import HeaderApp from './components/layout/HeaderApp.vue'
import FooterApp from './components/layout/FooterApp.vue'

</script>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>

</style>
