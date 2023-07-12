<template>
  <card-default :background="background" :class="classes" class="px-6 py-4">
    <div class="text-xl flex justify-center">
      <slot name="title"></slot>
    </div>

    <div class="text-base">
      <slot name="content"></slot>
    </div>

    <div>
      <slot name="button"></slot>
    </div>
  </card-default>
</template>

<script>
import CardDefault from "@/components/cardDefault.vue";
export default {
  name: "cardHome",
  components:{CardDefault},
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