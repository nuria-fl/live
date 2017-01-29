<template>
  <button type="button" name="button" @click="consume(item)" :disabled="disabled">{{ action }}</button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'consume',
  props: ['item'],
  computed: {
    action() {
      return this.item.type === 'food' ? 'Eat' : 'Drink'
    },
    ...mapState(['disabled'])
  },
  methods: {
    consume(item){
      let stat = item.type === 'food' ? 'food' : 'water'

      // calculate risk to get sick

      this.$store.commit('increase', {
        stat: stat,
        amount: item.value
      })
    }
  }
}
</script>
