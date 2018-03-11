<template>
  <div>
    <h4>Fire</h4>
    <template v-if="!hasFire">
      Start a fire to cook items
      <div>
        Items needed:
        {{item.items.join(', ')}}
      </div>
      <button
        type="button"
        class="Btn"
        @click="startFire(item)" :disabled="!item.isCraftable || disabled">
        Craft
      </button>
    </template>
    <template v-else>
      Fire is burning
    </template>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapState([ 'hasFire', 'disabled'])
    },
    methods: {
      ...mapMutations(['removeInventory', 'enableFire']),
      startFire(item) {
        this.item.items.forEach(item => {
          this.removeInventory({item})
        })
        this.enableFire()
      }
    }
  }
</script>