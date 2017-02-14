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
        <tab>
          <tab-content name="actions" :selected="true">
            <actions></actions>
          </tab-content>
          <tab-content name="inventory">
            <inventory></inventory>
          </tab-content>
          <tab-content name="crafting">
            <crafting></crafting>
          </tab-content>
        </tab>
      </div>
    </template>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import tab from '../components/Tab'
import tabContent from '../components/TabContent'
import actions from '../components/Actions'
import stats from '../components/Stats'
import inventory from '../components/Inventory'
import crafting from '../components/Crafting'

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
    tab,
    tabContent,
    stats,
    inventory,
    actions,
    crafting
  }
}
</script>
