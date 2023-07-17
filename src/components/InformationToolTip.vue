<template>
<div class="relative">
  <div @mouseenter="hovered"
        @mouseleave="leave"
        class="w-fit">
    <information-circle-outline class="w-full text-gray-400"></information-circle-outline>
  </div>

  <div v-if="show" class="absolute bg-gray-200 shadow-2xl border border-gray-100 p-3 transform -translate-x-1/2 mt-1">
    <div class="top-1/2">
      <slot></slot>
    </div>
  </div>
</div>
</template>

<script setup>

import {ref} from "vue";
import InformationCircleOutline from "@/components/icons/InformationCircleOutline.vue";

const show = ref(false)


function hovered() {
  show.value = true;
}

function leave() {
  show.value = false;
}
</script>

<script>
export default {
  name: "InformationToolTip"
}
</script>

<style scoped>

</style>