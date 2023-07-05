<template>
<div >
  connexion
  <text-field v-model="test" placeholder="placeholder" error-message="je suis lerrer" >
    <template v-slot:label>
      nom
    </template>
  </text-field>
  <div @click="show = true">
    click
  </div>

  <modal-default v-model="show">
    la
  </modal-default>


</div>
</template>

<script>
import TextField from "@/components/TextField.vue";
import ModalDefault from "@/components/ModalDefault.vue";

export default {
  name: "indexConnexion",
  components: {ModalDefault, TextField},
  data() {
    return {
      test:'le',
      show: false,
    }
  }
}
</script>

<style scoped>

</style>