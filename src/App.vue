<template>
	<main>
		<section v-if="!hasStarted" class="Splash">
			<h1>Live</h1>
			<p>A game about survival</p>
			<p>What's your name, survivor?</p>
			<form @submit.prevent="start">
				<input
					v-model="startUsername"
					type="text"
					required
					class="Splash__input"
				/>
				<button type="submit" class="Btn">New Game</button>
			</form>
		</section>
		<MainComponent v-else @newGame="start" />
		<footer class="Footer">
			<game-status-button v-if="hasStarted" />
			Bug report via
			<a href="https://github.com/nuria-fl/live">Github</a>
			or
			<a href="https://twitter.com/pincfloit">Twitter</a>
			· ☕ <a href="https://ko-fi.com/G2G5AV2X">Buy Me a Coffee</a>
		</footer>
	</main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import GameStatusButton from "./components/GameStatusButton.vue";
import { useStatusStore } from "./store/status";
import tracking from "./utils/tracking";
import MainComponent from "./views/Main.vue";

const hasStarted = ref(false);
const startUsername = ref("");
const statusStore = useStatusStore();

onMounted(() => {
	statusStore.initUsername();
	startUsername.value = statusStore.username;
});

function start() {
	tracking.trackEvent("game", "start");
	statusStore.setUsername(startUsername.value);
	hasStarted.value = true;
}
</script>

<style lang="scss">
body {
	margin: 0;
	font-family: "Fira Mono", monospace;
	font-size: 0.95em;
	overscroll-behavior: contain;
}

li {
	margin: 1em 0;
}

.Splash {
	padding: 3em 0 4em;
	text-align: center;

	&__input {
		margin-right: 0.5rem;
	}
}

.Footer {
	width: 100%;
	margin-top: 2em;
	padding: 1em;
	background: rgba(255, 255, 255, 0.8);

	@media screen and (min-width: 680px) {
		position: fixed;
		bottom: 0;
		left: 0;
	}
}
</style>
