<template>
  <div>
    <ul>
      <li v-for="(stat, key) in stats">
        {{ key }} : {{stat}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'stats',
  computed: {
    ...mapState(['stats'])
  },
  methods: {

  }
}
</script>
