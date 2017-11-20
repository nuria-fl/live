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
        <ul class="c-tabs">
          <li v-for="menuItem in navMenu" :key="menuItem" class="c-tabs__item">
            <router-link
              :to="{name: menuItem}"
              class="c-tabs__btn"
              :class="{ 'is-selected' : $route.name === menuItem }">
              {{ menuItem }}
            </router-link>
          </li>
        </ul>
        <router-view></router-view>
      </div>
    </template>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import stats from '../components/Stats'

export default {
  name: 'main',
  data () {
    return {
      navMenu: [
        'Actions',
        'Inventory',
        'Crafting'
      ]
    }
  },
  computed: {
    ...mapState(['disabled', 'gameOver'])
  },
  methods: {
    newGame(){
      this.$emit('newGame')
    }
  },
  components: {
    stats
  }
}
</script>
