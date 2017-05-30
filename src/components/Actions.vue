<template lang="html">
  <div>
    <button
      v-for="action in actions"
      :disabled="disabled"
      @click="action.method"
      class="o-btn o-btn--default o-btn--block o-btn--lg">
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
      const haveWeapon = this.$store.state.inventory.filter(item => item.type === 'weapon')

      if(haveWeapon.length){
        this.$store.dispatch('hunt', {time: 8000})
        .then((items) => {
          console.log('You hunted: ');
          items.forEach(item => {
            console.log(item.name)
          })
        })
      } else {
        alert('you need to craft a weapon first')
      }
    },
    scavenge() {
      this.$store.dispatch('scavenge', {time: 3000})
        .then((items) => {
          console.log('You found: ');
          items.forEach(item => {
            console.log(item.name)
          })
        })
    }
  }
}
</script>
