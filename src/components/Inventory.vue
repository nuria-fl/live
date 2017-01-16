<template>
  <ul>
    <li v-for="item in inventory">
      {{item.name}}
      <consume :item="item"></consume>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import consume from './Consume'

export default {
  name: 'inventory',
  data (){
    return {

    }
  },
  computed: {
    ...mapState(['inventory'])
  },
  components: {
    consume
  }
}
</script>
