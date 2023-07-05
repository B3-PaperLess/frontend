<template>
  <div>
    <component :is="'button'" class="h-full w-full"
               @click="onClick($event)">
      <slot></slot>
    </component>
  </div>
</template>

<script>
export default {
  name: "ButtonDefault",
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
      default: 5
    },
    height: {
      type: Number,
      required: false,
      default: 1
    },
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
