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
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapState([ 'hasFire', 'disabled', 'inventory'])
    },
    methods: {
      ...mapMutations(['enableFire']),
      ...mapActions(['removeItemsById']),
      startFire(item) {
        this.removeItemsById(this.item.items)
        this.enableFire()
      }
    }
  }
</script>
