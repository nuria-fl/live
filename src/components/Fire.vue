<template>
  <article class="Item">
    <h4>Fire</h4>
    <template v-if="!hasFire">
      <p>
        Items needed:
        {{item.items.join(', ')}}
        <br>
        Start a fire to cook items
      </p>
      <button
        type="button"
        class="Btn"
        @click="startFire(item)" :disabled="!item.isCraftable || disabled">
        Craft
      </button>
    </template>
    <p v-else>
      Fire is burning
    </p>
  </article>
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
