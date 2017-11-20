<template>
  <main>
  	<section class="o-container c-splash" v-if="!hasStarted">
  		<h1 class="c-splash__title">Live</h1>
    	<p class="c-splash__lead">A game about survival</p>
    	<button @click="start" class="c-splash__btn">New Game</button>
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
<style src="./assets/scss/index.scss" lang="scss"></style>
