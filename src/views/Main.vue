<template>
  <section>
    <div v-if="this.gameOver" class="Splash">
      <h1>GAME OVER</h1>
      <p>{{ deathText }}</p>
      <p>You survived {{ daysSurvived }} days</p>
      <button class="Btn" @click="newGame()">Start over</button>
    </div>
    <div v-if="!this.gameOver">
      <alert></alert>
      <header class="Header">
        <div class="Header__content">
          <mobile-menu></mobile-menu>
          <stats></stats>
          <days-counter></days-counter>
        </div>
      </header>
      <div class="Main">
        <div class="Main__column" v-show="mobileHome">
          <actions></actions>
        </div>
        <div class="Main__column" v-show="mobileInventory">
          <inventory></inventory>
        </div>
        <div class="Main__column" v-show="mobileCrafting">
          <crafting></crafting>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DaysCounter from '@/components/DaysCounter'
import MobileMenu from '@/components/MobileMenu'
import Stats from '@/components/Stats'
import Alert from '@/components/Alert'
import Actions from './Actions'
import Crafting from './Crafting'
import Inventory from './Inventory'

export default {
  name: 'mainElement',
  data () {
    return {
      navMenu: [
        'Actions',
        'Inventory',
        'Crafting'
      ],
      isMobile: true
    }
  },
  components: {
    Alert,
    Actions,
    Crafting,
    Inventory,
    DaysCounter,
    MobileMenu,
    Stats
  },
  mounted () {
    const bdSize = document.querySelector('body').getBoundingClientRect()
    this.isMobile = bdSize.width <= 680
    this.initInventory()
  },
  computed: {
    ...mapState(['disabled', 'gameOver', 'daysSurvived', 'currentPage', 'causeOfDeath']),
    mobileHome () {
      return this.isMobile === false || this.isMobile && this.currentPage === 'home'
    },
    mobileInventory () {
      return this.isMobile === false || this.isMobile && this.currentPage === 'inventory'
    },
    mobileCrafting () {
      return this.isMobile === false || this.isMobile && this.currentPage === 'crafting'
    },
    deathText() {
      switch (this.causeOfDeath) {
        case 'sleep':
          return 'You died from exhaustion. Remember, sleeping is important, even in the wild.'
        case 'water':
          return 'You died of thirst. A water collector could have saved your life.'
        case 'food':
          return 'You died of hunger. A sturdy weapon would have provided you with a steady food supply.'
        case 'health':
          return 'You died of sickness. Skip the paleo diet, cooking your food is important.'
      }
    }
  },
  methods: {
    ...mapActions(['initInventory']),
    newGame(){
      window.location.reload()
      // this.$emit('newGame')
    }
  }
}
</script>

<style lang="scss">
  .Header {
    width: 100%;
    position: fixed;
    background: #DDD;
    &__content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1em 1em 1em 4em;
      @media screen and (min-width: 680px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1em;
      }
      @media screen and (min-width: 1400) {
        padding: 0;
      }
    }
  }

  .Main {
    width: 95%;
    max-width: 1400px;
    margin: 0 auto;
    padding-top: 4.2em;
    @media screen and (min-width: 680px) {
      display: flex;
      justify-content: space-between;
      padding-bottom: 4em;
      > * {
        flex: 1 1 0;
      }
    }

    &__column {
      @media screen and (min-width: 680px) {
        padding: 0 1em;
      }
    }
  }
</style>
