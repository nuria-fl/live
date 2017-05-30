<template lang="html">
  <div>
    <button
      v-for="action in actions"
      :disabled="disabled"
      @click="action.method"
      class="o-btn o-btn--default o-btn--block o-btn--lg">
      {{ action.name }}
    </button>
    <modal :visible="true" ref="modal">
      <div slot="body">
        You got {{ lastActionResult }}
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import modal from './Modal'

export default {
  name: 'actions',
  data () {
    return {
      lastActionResult: '',
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
        this.lastActionResult = ''

        this.$store.dispatch('hunt', {time: 8000})
          .then((items) => {
            this.handleResult(items)
          })
      } else {
        alert('you need to craft a weapon first')
      }
    },
    scavenge() {
      this.lastActionResult = ''

      this.$store.dispatch('scavenge', {time: 3000})
        .then((items) => {
          this.handleResult(items)
        })
    },
    handleResult(items) {
      const itemsAcquired = []
      items.forEach(item => {
         itemsAcquired.push(item.name)
      })
      this.$refs.modal.open();
      this.lastActionResult = itemsAcquired.join(', ')
    }
  },
  components: {
    modal
  }
}
</script>
