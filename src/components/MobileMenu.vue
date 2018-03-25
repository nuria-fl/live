<template>
    <div class="Menu">
      <button
        class="Btn Menu__toggle"
        @click="toggleMenu">
        <span></span>
      </button>
      <ul class="Menu__dropdown" v-show="isMenuVisible">
        <li @click="goTo('home')">
          Actions
        </li>
        <li @click="goTo('inventory')">
          Backpack
        </li>
        <li @click="goTo('crafting')">
          Crafting
        </li>
      </ul>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      isMenuVisible: false
    }
  },
  methods: {
    ...mapMutations(['changePage']),
    toggleMenu () {
      this.isMenuVisible = !this.isMenuVisible
    },
    goTo (newPage) {
      this.changePage({ newPage })
      this.toggleMenu()
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/styles/variables';

  .Menu {
    position: absolute;
    left: 1em;
    top: 50%;
    margin-top: -1.35em;
    @media screen and (min-width: 680px) {
      display: none;
    }
    &__toggle {
      width: 2.5em;
      height: 2.5em;
      padding: .7em .5em;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span,
      &:before,
      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background: #000;
      }
    }
    &__dropdown {
      min-width: 50%;
      position: fixed;
      left: 0;
      top: 4em;
      padding: 0 1em;
      background: $lightColor;
      li {
        margin: 0;
        padding: .8em 0;
        border-bottom: 1px solid $darkColor;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
