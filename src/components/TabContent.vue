<template>
  <div v-show="isActive" class="c-tabs__content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'contentTab',
  props: {
    name: { required: true },
    selected: { default: false }
  },
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    this.isActive = this.selected
  }
}
</script>
