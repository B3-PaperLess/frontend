<template>
  <component :is="'button'"
             :style="{background:[ disabled ? disableBackground : background], color: [disabled ? '#757474' : '#2a2a2a']}"
             class="rounded shadow text-lg whitespace-nowrap font-medium"
             @click="onClick($event)">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "ButtonDefault",
  emits:['click'],
  data: () => ({
    hovered: false,
  }),
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    width: {
      type: Number,
      required: false,
      default: 3
    },
    height: {
      type: Number,
      required: false,
      default: 0.8
    },
    background: {
      type: String,
      default:'#f3ecc1',
      required: false
    },
    disableBackground: {
      type: String,
      default:'#fdfaee',
      required: false
    },
    label: {
      type: String,
      default:'click',
      required: false
    }
  },
  methods: {
    onClick(event) {
      if (this.disabled || this.loading) {
        return;
      }

      this.$emit('click', event);

      if (this.href != null) {
        if (this.href.startsWith("http")) {
          window.location.href = this.href;
        } else {
          this.$router.push({path: this.href});
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>
