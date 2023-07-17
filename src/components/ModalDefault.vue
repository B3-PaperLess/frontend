<template>
  <div v-if="value" class="fixed top-0 left-0 h-[100%] w-full bg-gray-800/30 flex items-center justify-center " @click.self="close">
    <div class="relative rounded-3xl max-h-[90%] max-w-[90%]" :class="classe" :style="{background:background}">
      <slot class="h-full"/>
    </div>
  </div>
</template>
<script setup>
import {toRef} from "vue";
import XSolid from "@/components/icons/XSolid.vue";

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue:{},
  full: {
    type: Boolean,
    default: false,
  },
  classe: {
    type: String,
    default: "w-fit"
  },
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
  background:{
    type: String,
    required:false,
    default:'#FFFFFF'
  }
})

const value = toRef(props, 'modelValue')

function close() {
  emits('update:modelValue', false)
}
</script>
<script>
export default {
  name: "ModalDefault",
}
</script>

<style scoped>

</style>
