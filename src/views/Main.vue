<template>
  <section class="o-container o-container--grid">
    <div v-if="this.gameOver" class="c-splash">
      <h1 class="c-splash__title">GAME OVER</h1>
      <button type="button" @click="newGame()" class="c-splash__btn">Start over</button>
    </div>
    <template v-if="!this.gameOver">
      <div class="o-container__sidebar">
        <stats></stats>
      </div>
      <div class="o-container__main">
        <inventory></inventory>
        <actions></actions>
        <!-- <crafting></crafting> -->
      </div>
    </template>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import actions from '../components/Actions'
import stats from '../components/Stats'
import inventory from '../components/Inventory'

export default {
  name: 'main',
  data () {
    return {}
  },
  computed: {
    ...mapState(['disabled', 'gameOver'])
  },
  methods: {
    newGame(){
      this.router.push('/')
    }
  },
  components: {
    stats,
    inventory,
    actions
  }
}
</script>
