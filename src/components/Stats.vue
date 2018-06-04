<template>
  <ul class="Stats">
    <li
      v-for="(stat, key) in stats"
      :key="key"
      class="Stats__item">
      <span class="Stats__icon">{{ icons[key] }}</span>
      <strong
        :class="{
          warning: stat < 50,
          danger: stat < 20
      }">
        {{ stat }}
      </strong>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import gameLoop from '@/mixins/gameLoop'

export default {
  mixins: [ gameLoop ],
  data () {
    return {
      icons: {
        health: '❤️',
        water: '💧',
        food: '🍗',
        energy: '⚡'
      }
    }
  },
  computed: {
    ...mapState(['stats', 'gameOver', 'isSick']),
    isActive () {
      return this.gameOver === false
    }
  },
  methods: {
    ...mapMutations(['decrease']),
    startGameLoop () {
      this.decreaseStats()
    },
    decreaseStats () {
      const decreaseInterval = 12 * 1000
      this.loop = setTimeout(() => {
        if (this.isActive) {
          this.decrease({ stat: 'water', amount: 3 })
          this.decrease({ stat: 'food', amount: 2 })
          this.decrease({ stat: 'energy', amount: 2 })
          if (this.isSick) {
            this.decrease({ stat: 'health', amount: 2 })
          }

          this.decreaseStats()
        }
      }, decreaseInterval)
    }
  }
}
</script>

<style lang="scss">
  .Stats {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    &__item {
      margin: 0;
      white-space: nowrap;
      padding: .1em 1em .1em 0;
      @media screen and (min-width: 680px) {
        margin: 1em 0;
        padding-left: 1em;
      }
    }
    &__icon {
      filter: grayscale(50%);
    }
  }
  .warning {
    color: #fa0;
  }
  .danger {
    color: #c00;
  }
</style>
