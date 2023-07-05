<template>
  <div class="w-fit h-fit">
    <div class="flex align-start justify-start text-sm text-gray-600">
      <slot name="label"></slot>
    </div>

    <div :class="[isError ? 'border-[0.06em] border-red-300' : isInputFocused ? 'border-[0.06em] border-gray-400' : 'border-[0.04em] border-gray-400']" class="rounded">
      <input type="text"
             v-model="value"
             class="rounded pl-3"
             :placeholder="placeholder"
             :style="{background:color}"
             @focus="onInputFocus"
             @blur="onInputBlur"
      />
    </div>

    <div v-if="isError && errorMessage.length > 0" class="flex align-start justify-start text-sm text-red-300 mt-1 ml-2">
      {{errorMessage}}
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps,defineEmits, watch} from "vue";

const emits= defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue:{},
  placeholder: {
    type:String,
    required: false,
    default:''
  },
  color:{
    type:String,
    required: false,
    default:'#EFEFEF'
  },
  errorMessage: {
    type:String,
    required: false,
    default:''
  }
})

const value = ref(props.modelValue)
let isInputFocused = ref(false)
let isError = ref(false)
function onInputFocus() {
  isInputFocused.value = true;
}
function onInputBlur() {
  isInputFocused.value = false;
}

watch(value, () => {
  emits('update:modelValue', value.value)
})
</script>

<script>
export default {
  name: "TextField",
  methods: {
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>