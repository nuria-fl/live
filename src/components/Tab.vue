<template>
  <div>
    <ul class="c-tabs">
      <li v-for="menuItem in navMenu" class="c-tabs__item">
        <button
          @click="selectMenuItem(menuItem)"
          class="c-tabs__btn"
          :class="{ 'is-selected' : menuItem.isActive }">
          {{ menuItem.name }}
        </button>
      </li>
    </ul>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data() {
    return {
      navMenu:[]
    }
  },
  mounted() {

    this.navMenu = this.$children
    console.log(this.navMenu);
  },
  methods: {
    selectMenuItem(selectedMenuItem) {
      this.navMenu.forEach( item => {
        item.isActive = (item == selectedMenuItem)
      })
    }
  }
}
</script>
