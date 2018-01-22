<template>
  <main>
    <section v-if="!hasStarted">
      <h1>Live</h1>
      <p>A game about survival</p>
      <button @click="start">New Game</button>
    </section>
    <main-component v-else @newGame="start"></main-component>
  </main>
</template>

<script>
import Main from './views/Main'

export default {
  data() {
    return {
      hasStarted: false
    }
  },
  components: {
    MainComponent: Main
  },
  methods: {
    start() {
      this.hasStarted = true
    }
  }

}
</script>

<style lang="scss">
  body {
    font-family: monospace;
  }
</style>
<!-- <style src="./assets/scss/index.scss" lang="scss"></style> -->
