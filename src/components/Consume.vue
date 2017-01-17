<template>
  <button type="button" name="button" @click="consume(item)">{{ action }}</button>
</template>

<script>
export default {
  name: 'consume',
  props: ['item'],
  computed: {
    action() {
      return this.item.type === 'food' ? 'Eat' : 'Drink'
    }
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
