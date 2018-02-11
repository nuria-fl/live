<template lang="html">
  <div>
    <p>
      <button
        v-for="action in actions"
        :disabled="disabled"
        @click="action.method">
        {{ action.name }}
      </button>
    </p>
    <modal ref="modalResult">
      <div slot="body">
        You got {{ lastActionResult }}
      </div>
    </modal>
    <div v-show="inProgress" class="progress">
      {{ currentAction }}
    </div>
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
      inProgress: false,
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
      this.startProgress('Sleeping')

      this.increaseAsync({
        stat: 'sleep',
        amount: 35,
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
        this.startProgress('Hunting')
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

      this.startProgress('Scavenging')
      this.lastActionResult = ''

      this.scavenge({time: 3000})
        .then((items) => {
          this.handleResult(items)
        })
    },
    handleResult(items) {
      this.endProgress()

      if(items) {
        const itemsAcquired = []
        items.forEach(item => {
          itemsAcquired.push(item.name)
        })
        this.$refs.modalResult.open();
        this.lastActionResult = itemsAcquired.join(', ')
      }
    },
    startProgress(action) {
      this.currentAction = action
      this.inProgress = true
    },
    endProgress() {
      this.currentAction = null
      this.inProgress = false
    }
  },
  components: {
    modal
  }
}
</script>

<style lang="scss">
  .progress {
    &:after {
      content: '...';
      animation: progress 1.5s linear infinite;
      display: inline;
    }
  }

  @keyframes progress {
    0% {
      content: '.'
    }
    33.333% {
      content: '..'
    }
    66.666% {
      content: '...'
    }
  }
</style>