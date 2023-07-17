<template>
<div>
  <div @mouseenter="hovered"
        @mouseleave="leave">
    activator
  </div>

  <div v-if="show">
    content afficher
  </div>
</div>
</template>

<script setup>

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