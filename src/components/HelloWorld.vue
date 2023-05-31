<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <VBtn 
      prepend-icon="mdi-vuetify" 
      @click="Test()"
    >
      Button
    </VBtn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {

  },
  methods: {
    ...mapActions(["firstRequest"]),
    async Test() {
      await this.firstRequest({ id: "1", test: "test" })
      //console.log("test")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
