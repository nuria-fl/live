<template>
  <main class="o-container">
    <div v-if="this.gameOver">
      GAME OVER
      <button type="button" @click="newGame()">Start over</button>
    </div>
    <template v-if="!this.gameOver">
      <div class="o-container__sidebar">
        <stats></stats>
      </div>
      <div class="o-container__main">
        <inventory></inventory>
        <actions></actions>
      </div>
    </template>
  </main>
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
      location.reload()
    }
  },
  components: {
    stats,
    inventory,
    actions
  }
}
</script>
