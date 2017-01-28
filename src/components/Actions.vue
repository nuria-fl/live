<template lang="html">
  <div>
    <button :disabled="disabled" @click="sleep()">Sleep</button>
    <button :disabled="disabled" @click="hunt()">Hunt</button>
    <button :disabled="disabled" @click="scavenge()">Scavenge</button>
  </div>
</template>

<script>
export default {
  name: 'actions',
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
  }
}
</script>
