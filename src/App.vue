<template>
  <main>
    <section v-if="!hasStarted">
      <h1>Live</h1>
      <p>A game about survival</p>
      <button @click="start">New Game</button>
    </section>
    <main-component v-else @newGame="start"></main-component>
    <footer>
      Bug report via
      <a href="https://github.com/nuria-fl/live">Github</a>
      or
      <a href="https://twitter.com/pincfloit">Twitter</a>
    </footer>
  </main>
</template>

<script>
import Main from '@/views/Main'

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
  @import './assets/styles/index';

  body {
    margin: 0;
    font-family: 'Fira Mono', monospace;
  }
  li {
    margin: 1em 0;
  }
  footer {
    margin-top: 2em;
    @media screen and (min-width: 680px) {
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 1em;
    }
  }
</style>
