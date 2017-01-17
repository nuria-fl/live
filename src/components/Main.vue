<template>
  <main>
    <stats></stats>
    <inventory></inventory>
    <button :disabled="disabled" @click="sleep()">Sleep</button>
    <button :disabled="disabled" @click="hunt()">Hunt</button>
    <button :disabled="disabled" @click="scavenge()">Scavenge</button>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import stats from './Stats'
import inventory from './Inventory'

export default {
  name: 'main',
  data () {
    return {}
  },
  computed: {
    ...mapState(['disabled'])
  },
  methods: {
    sleep() {
      this.$store.commit('increase', {
        stat: 'sleep',
        amount: 30
      })

      this.$store.commit('disable', {
        time: 5000
      })
    },
    hunt() {
      this.$store.commit('disable', {
        time: 5000
      })
      this.$store.commit('decrease', { stat: 'sleep', amount: 10 })
    },
    scavenge() {
      this.$store.commit('disable', {
        time: 5000
      })
      this.$store.commit('decrease', { stat: 'sleep', amount: 5 })
    }
  },
  components: {
    stats,
    inventory
  }
}
</script>
