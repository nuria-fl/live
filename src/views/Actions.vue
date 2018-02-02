<template lang="html">
  <div>
    <button
      v-for="action in actions"
      :disabled="disabled"
      @click="action.method">
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
import { mapState, mapGetters, mapActions } from 'vuex'
import modal from '../components/Modal'

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
          method: this.goHunt
        },
        {
          name: 'Scavenge',
          method: this.goScavenge
        }
      ]
    }
  },
  computed: {
    ...mapState(['disabled', 'gameOver', 'inventory']),
    ...mapGetters(['isInventoryFull', 'slotsInInventoryLeft'])
  },
  methods: {
    ...mapActions(['increaseAsync', 'hunt', 'scavenge']),
    handleFullInventory() {
      alert('Your inventory is full. Remove at least one item to proceed.')
    },
    sleep() {
      this.openStatusModal('Sleeping')

      this.increaseAsync({
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
    goHunt() {
      if(this.isInventoryFull) {
        this.handleFullInventory()
        return
      }

      const hasWeapon = this.inventory.filter(item => item.type === 'weapon').length > 0

      if(hasWeapon){
        this.openStatusModal('Hunting')
        this.lastActionResult = ''

        this.hunt({time: 8000})
          .then((items) => {
            this.handleResult(items)
          })
      } else {
        alert('you need to craft a weapon first')
      }
    },
    goScavenge() {
      if(this.isInventoryFull) {
        this.handleFullInventory()
        return
      }

      this.openStatusModal('Scavenging')
      this.lastActionResult = ''

      this.scavenge({time: 3000})
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
