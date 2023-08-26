<template>
  <div class="Splash">
    <h1>GAME OVER</h1>
    <p>{{ deathText }}</p>
    <p>You survived {{ daysSurvived }} days</p>
    <button class="Btn" @click="newGame">
      Start over
    </button>
    <Ranking v-if="scoreSent" />
    <p v-else>Updating high scores...</p>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'
import { apolloClient } from '@/apollo'
import Ranking from '@/components/Ranking.vue'

export default {
  components: {
    Ranking
  },
  data() {
    return {
      scoreSent: false
    }
  },
  computed: {
    ...mapState(['daysSurvived', 'causeOfDeath', 'username']),
    deathText() {
      switch (this.causeOfDeath) {
        case 'energy':
          return 'You died from exhaustion. Remember, sleeping is important, even in the wild.'
        case 'water':
          return 'You died of thirst. A water collector could have saved your life.'
        case 'food':
          return 'You died of hunger. A sturdy weapon would have provided you with a steady food supply.'
        case 'health':
          return 'You died of sickness. Skip the paleo diet, cooking your food is important.'
        default:
          return ''
      }
    }
  },
  mounted() {
    return apolloClient
      .mutate({
        mutation: gql`
          mutation AddScore(
            $user: String!
            $days: Int!
            $causeOfDeath: String!
            $version: String!
          ) {
            addScore(
              score: {
                user: $user
                days: $days
                causeOfDeath: $causeOfDeath
                version: $version
              }
            ) {
              success
            }
          }
        `,
        variables: {
          user: this.username,
          days: this.daysSurvived,
          causeOfDeath: this.causeOfDeath,
          version: 'vue-0.14.0'
        }
      })
      .then(() => {
        this.scoreSent = true
      })
  },
  methods: {
    newGame() {
      window.location.reload()
    }
  }
}
</script>
