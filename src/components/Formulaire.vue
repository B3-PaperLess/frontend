<template>
<Form ref="form" v-slot="{values, meta, errors, resetForm}">
  <slot :values="values" :meta="meta" :errors="errors" :valid="meta.valid && meta.dirty" :resetForm="resetForm"></slot>
</Form>
</template>
<script>
import {Form} from 'vee-validate';

export default {
  name: "Formulaire",
  components:{Form},
  methods: {
    reset() {
      this.$refs?.form.reset();
    },
    validateField(p) {
      return this.$refs?.form.validateField(p);
    },
    getValues() {
      return this.$refs?.form.getValues();
    },
    getErrors() {
      return this.$refs?.form.getErrors();
    }
  },
}
</script>
<style scoped>

</style>