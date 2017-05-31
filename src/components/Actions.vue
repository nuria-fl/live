<template lang="html">
  <div>
    <button
      v-for="action in actions"
      :disabled="disabled"
      @click="action.method"
      class="o-btn o-btn--default o-btn--block o-btn--lg">
      {{ action.name }}
    </button>
    <modal ref="modalResult">
      <div slot="body">
        You got {{ lastActionResult }}
      </div>
    </modal>
    <modal :isCloseable="false" ref="modalAction">
      <div slot="body">
        {{ currentAction }}
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
      currentAction: null,
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
      this.openStatusModal('Sleeping')

      this.$store.dispatch('increase', {
        stat: 'sleep',
        amount: 30,
        time: 5000
      })
        .then(()=> {
          this.handleResult()
        })
        .catch(()=>{
          console.error('oops');
        })
    },
    hunt() {
      const haveWeapon = this.$store.state.inventory.filter(item => item.type === 'weapon')

      if(haveWeapon.length){
        this.openStatusModal('Hunting')
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
      this.openStatusModal('Scavenging')
      this.lastActionResult = ''

      this.$store.dispatch('scavenge', {time: 3000})
        .then((items) => {
          this.handleResult(items)
        })
    },
    openStatusModal(action) {
      this.currentAction = action

      this.$refs.modalAction.open();
    },
    closeStatusModal() {
      this.currentAction = null

      this.$refs.modalAction.close();
    },
    handleResult(items) {
      this.closeStatusModal()

      if(items) {
        const itemsAcquired = []
        items.forEach(item => {
          itemsAcquired.push(item.name)
        })
        this.$refs.modalResult.open();
        this.lastActionResult = itemsAcquired.join(', ')
      }
    }
  },
  components: {
    modal
  }
}
</script>
