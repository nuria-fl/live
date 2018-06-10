<template>
  <section class="Ranking">
    <ul>
      <li
        v-for="item in ranking"
        :key="item.id">
        {{ item.user }}
        {{ item.days }}
      </li>
    </ul>
  </section>
</template>

<script>
import dbRanking from '@/firebase/ranking'

export default {
  data () {
    return {
      ranking: []
    }
  },
  mounted () {
    this.getRanking()
  },
  methods: {
    getRanking () {
      dbRanking.onSnapshot(snapshot => {
        const ranking = []
        snapshot.forEach(item => {
          ranking.push(item.data())
        })
        this.ranking = ranking
      })
    }
  }
}
</script>

<style lang="scss">

</style>
