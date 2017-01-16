<template>
  <main>
    <stats></stats>
    <inventory></inventory>
    <button @click="sleep()">Sleep</button>
  </main>
</template>

<script>
import stats from './Stats'
import inventory from './Inventory'

export default {
  name: 'main',
  data () {
    return {}
  },
  methods: {
    sleep() {
      this.$store.commit('increase', {
        stat: 'sleep',
        amount: 30
      })
    }
  },
  components: {
    stats,
    inventory
  }
}
</script>
