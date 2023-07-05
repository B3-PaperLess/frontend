<template>
  <div :class="classes" :style="{width: width + 'em', height: height + 'em', background: background}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CardDefault",
  props: {
    height: {
      type: Number,
      required:false,
      default:10
    },
    width: {
      type: Number,
      required:false,
      default:10
    },
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