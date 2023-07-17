<template>
  <div class="">
    <div class="flex align-start justify-start text-sm text-gray-600">
      <slot v-if="label.length === 0"></slot>

      <div v-else class="text-xs flex align-start">
        {{label}}
      </div>
    </div>

    <div :class="[isError ? 'border-[0.06em] border-red-300' : isInputFocused ? 'border-[0.06em] border-gray-400' : 'border-[0.04em] border-gray-400']"
         class="rounded"
    >
      <input
             v-model="value"
             class="rounded pl-3 text-sm w-full "
             :placeholder="placeholder"
             :style="{background:color, height: height + 'em'}"
             @focus="onInputFocus"
             @blur="onInputBlur"
             :name="vid"
             :type="type"
             :rules="rules"
      />
    </div>

    <div v-if="errorMessage?.length > 0" class="flex align-start justify-start text-sm text-red-300 mt-1 ml-2">
      {{errorMessage}}
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, defineEmits, watch, toRef} from "vue";
import {useField} from "vee-validate";

const emits= defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue:{},
  vid: {
    type:String,
    required:false,
  },
  placeholder: {
    type:String,
    required: false,
    default:''
  },
  label: {
    type:String,
    required: false,
    default:''
  },
  color:{
    type:String,
    required: false,
    default:'#EFEFEF'
  },
  height: {
    type:Number,
    default:2.5,
    required: false
  },
  rules:{
    type: String,
    required: false,
    default: ""
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  }
})

const vid = toRef(props, 'vid')

const {value, errorMessage} = useField(vid,props.rules, {
  initialValue: props.modelValue
} );

const valueInput = ref(props.modelValue)
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
}
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>