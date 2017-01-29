<template lang="html">
  <div>
    <button
      v-for="action in actions"
      :disabled="disabled"
      @click="action.method"
      class="o-btn o-btn--default o-btn--block">
      {{ action.name }}
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'actions',
  data () {
    return {
      actions: [
        {
          name: 'Sleep',
          method: this.sleep
        },
        {
          name: 'Hunt',
          method: this.hunt
        },
        {
          name: 'Scavenge',
          method: this.scavenge
        }
      ]
    }
  },
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
