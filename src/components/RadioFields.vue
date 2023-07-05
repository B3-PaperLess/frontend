<template>
<div>
  <template v-for="(item, index) in items">
    <div class="flex flex-row ">
      <div>
        {{items[index].label}}
      </div>
      <div class="rounded-full bg-white w-3 h-3 flex items-center align-center p-[0.7%] border-[0.03em]"
           :style="{borderColor: select === items[index][key] ? colorSelected : '#AAAAAA'}"
           @click="select=items[index][key]"
      >
        <div v-if="select === items[index][key]"
             class="rounded-full"
             :style="{background:colorSelected}">
        </div>
      </div>
    </div>
  </template>
</div>
</template>

<script setup>
import {ref, watch} from "vue";

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {},
  items: {
    type: [Array, Object],
    required: true,
    default: {label: 'label', value: 'value'}
  },
  key : {
    type: String,
    required: false,
    default: 'value'
  },
  colorSelected: {
    type: String,
    required: false,
    default: '#465ce7'
  }
})
let select = ref(null)

watch(select, () => {
  emits('update:modelValue', select)
})
</script>

<script>
export default {
  name: "RadioFields"
}
</script>

<style scoped>

</style>