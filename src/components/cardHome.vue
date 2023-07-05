<template>
  <card-default :height="height" :width="width" :background="background" :class="classes" class="px-6 py-4">
    <div class="h-12  mt-2">
      <slot name="title"></slot>
    </div>

    <div class="text-base flex align-start justify-start mt-10 px-4">
      <slot name="content"></slot>
    </div>

    <div class="flex justify-end">
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