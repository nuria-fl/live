<template>
  <section>
    <div v-if="this.gameOver">
      <h1>GAME OVER</h1>
      <button type="button" @click="newGame()">Start over</button>
    </div>
    <div v-if="!this.gameOver" class="hud">
      <div>
        <stats></stats>
        <actions></actions>
      </div>
      <inventory></inventory>
      <crafting></crafting>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Stats from '../components/Stats'
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
      ]
    }
  },
  components: {
    Actions,
    Crafting,
    Inventory,
    Stats
  },
  computed: {
    ...mapState(['disabled', 'gameOver'])
  },
  methods: {
    newGame(){
      window.location.reload()
      // this.$emit('newGame')
    }
  }
}
</script>

<style lang="scss">
  .hud {
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    @media screen and (min-width: 680px) {
      display: flex;
      justify-content: space-between;
      > * {
        flex: 1 1 0;
      }
    }
  }
</style>
