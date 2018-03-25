<template>
  <main>
    <section v-if="!hasStarted" class="Splash">
      <h1>Live</h1>
      <p>A game about survival</p>
      <button @click="start" class="Btn">New Game</button>
    </section>
    <main-component v-else @newGame="start"></main-component>
    <footer class="Footer">
      Bug report via
      <a href="https://github.com/nuria-fl/live">Github</a>
      or
      <a href="https://twitter.com/pincfloit">Twitter</a>
      ·
      ☕ <a href='https://ko-fi.com/G2G5AV2X'>Buy Me a Coffee</a>
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
  .Splash {
    padding-top: 3em;
    text-align: center;
  }
  .Footer {
    width: 100%;
    margin-top: 2em;
    padding: 1em;
    background: rgba(255,255,255,.8);
    @media screen and (min-width: 680px) {
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
</style>
