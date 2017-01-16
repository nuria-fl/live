<template>
  <main>
    <stats></stats>
    <button @click="drink()">Drink</button>
    <button @click="eat()">Eat</button>
    <button @click="sleep()">Sleep</button>
  </main>
</template>

<script>
import stats from './Stats'

export default {
  name: 'main',
  data () {
    return {}
  },
  methods: {
    drink() {
      this.$store.commit('increase', {
        stat: 'water',
        amount: 10
      })
    },
    eat() {
      this.$store.commit('increase', {
        stat: 'food',
        amount: 20
      })
    },
    sleep() {
      this.$store.commit('increase', {
        stat: 'sleep',
        amount: 30
      })
    }
  },
  components: {
    stats
  }
}
</script>
