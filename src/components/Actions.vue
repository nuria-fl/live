<template lang="html">
  <div>
    <button :disabled="disabled" @click="sleep()">Sleep</button>
    <button :disabled="disabled" @click="hunt()">Hunt</button>
    <button :disabled="disabled" @click="scavenge()">Scavenge</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'actions',
  computed: {
    ...mapState(['disabled', 'gameOver'])
  },
  methods: {
    sleep() {
      this.$store.dispatch('increase', {
        stat: 'sleep',
        amount: 30,
        time: 5000
      })
        .then(()=> {
          console.log('sleeping done!');
        })
        .catch(()=>{
          console.error('oops');
        })
    },
    hunt() {
      this.$store.dispatch('decrease', { stat: 'sleep', amount: 10, time: 5000 })
        .then(()=> {
          console.log('hunting done!');
        })
        .catch(()=>{
          console.error('oops');
        })
    },
    scavenge() {
      this.$store.dispatch('decrease', { stat: 'sleep', amount: 5, time: 5000 })
        .then(()=> {
          console.log('scavenging done!');
        })
        .catch(()=>{
          console.error('oops');
        })
    }
  }
}
</script>
