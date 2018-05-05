<template>
  <article class="Item">
    <h4>Fire</h4>
    <template v-if="!hasFire">
      <p>
        Items needed:
        {{ itemsNeeded }}
        <br>
        Start a fire to cook items
      </p>
      <button
        type="button"
        class="Btn"
        @click="startFire()" :disabled="!item.isCraftable || disabled">
        Craft
      </button>
    </template>
    <div v-else>
      <p>{{ statusMessage }}</p>
      <button
        v-show="fireStatus > 0"
        type="button"
        class="Btn"
        :disabled="!hasWood || disabled"
        @click="rekindle()">
        Add more wood
      </button>
    </div>
  </article>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import eventBus from '@/utils/eventBus'
  import items from '@/utils/items'

  export default {
    data () {
      return {
        fireStatus: 0,
        fireInterval: null
      }
    },
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapState([ 'hasFire', 'disabled', 'inventory']),
      hasWood() {
        return !!this.inventory.find(item => item.id === 'wood')
      },
      statusMessage() {
        switch(this.fireStatus) {
          case 0:
            return 'Fire is burning hot'
          case 1:
            return 'Fire is burning'
          case 2:
            return 'Fire is burning low'
        }
      },
      itemsNeeded() {
        return this.item.items.map(items.getName).join(', ')
      }
    },
    methods: {
      ...mapMutations(['enableFire', 'disableFire']),
      ...mapActions(['removeItemsById']),
      startFire() {
        this.removeItemsById(this.item.items)
        this.enableFire()
        this.startFireInterval()
      },
      startFireInterval() {
        const day = 1000 * 60

        this.fireInterval = setInterval(() => {
          this.fireStatus++
          if (this.fireStatus === 3) {
            this.resetFire()
          }
        }, day)
      },
      resetFire() {
        clearInterval(this.fireInterval)
        eventBus.$emit('showModal', {
          body: 'Fire has burnt out!'
        })
        this.disableFire()
        this.fireStatus = 0
      },
      rekindle() {
        this.removeItemsById(['wood'])
        this.fireStatus = 0
        clearInterval(this.fireInterval)
        this.startFireInterval()
      }
    }
  }
</script>
