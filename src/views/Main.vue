<template>
  <main>
    <div v-if="this.gameOver">
      GAME OVER
      <button type="button" @click="this.$emit('newGame')">Start over</button>
    </div>
    <div v-if="!this.gameOver">
      <stats></stats>
      <inventory></inventory>
      <actions></action>
    </div>
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
  components: {
    stats,
    inventory,
    actions
  }
}
</script>
