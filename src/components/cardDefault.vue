<template>
  <div :class="classes" :style="{background: background}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CardDefault",
  props: {

    classes: {
      type:String,
      required:false,
      default:''
    },
    background:{
      type: String,
      required:false,
      default:'#FFFFFF'
    }
  }
}
</script>

<style scoped>

</style>