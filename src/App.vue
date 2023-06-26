<template>
  <div class="flex flex-col min-h-screen w-full">
    <header class="w-full">
      <header-app class=""></header-app>
    </header>

    <main class="flex-grow w-full h-full bg-cream">
      <router-view></router-view>
    </main>

    <footer class="w-full">
      <footer-app class=""></footer-app>
    </footer>
  </div>
</template>

<script>
import HeaderApp from './components/HeaderApp.vue'
import FooterApp from './components/FooterApp.vue'

export default {
  name: 'App',
  components: {
    HeaderApp,
    FooterApp
  },
  created() {
    console.log(this.$router)
  }
}
</script>

<style>
div{
   color: rebeccapurple;
  font-size: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

header-app {
  flex-grow: 0;
}

.content {
 flex-grow: 1;
}

footer-app {
  flex-grow: 0;
}

</style>
