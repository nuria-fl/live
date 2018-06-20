<template>
  <div class="Splash">
    <h1>GAME OVER</h1>
    <p>{{ deathText }}</p>
    <p>You survived {{ daysSurvived }} days</p>
    <button
      class="Btn"
      @click="newGame">
      Start over
    </button>
    <ranking/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Ranking from '@/components/Ranking'
import dbRanking from '@/firebase/ranking'

export default {
  components: {
    Ranking
  },
  computed: {
    ...mapState(['daysSurvived', 'causeOfDeath', 'username']),
    deathText () {
      switch (this.causeOfDeath) {
        case 'energy':
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
  mounted () {
    const time = +new Date()
    const id = time.toString()
    const message = {
      user: this.username,
      days: this.daysSurvived,
      causeOfDeath: this.causeOfDeath
    }
    dbRanking.doc(id).set(message)
  },
  methods: {
    newGame () {
      window.location.reload()
    }
  }
}
</script>
