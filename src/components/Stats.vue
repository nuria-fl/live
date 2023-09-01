<template>
	<ul class="Stats">
		<li v-for="(stat, key) in stats" :key="key" class="Stats__item">
			<span class="Stats__icon">{{ icons[key] }}</span>
			<strong
				:class="{
					warning: stat < 50,
					danger: stat < 20,
				}"
			>
				{{ stat }}
			</strong>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import { useGameLoop } from "../mixins/useGameLoop";

const store = useStore();

const { loopTimeoutId, isActive } = useGameLoop(startGameLoop);

const icons = {
	health: "❤️",
	water: "💧",
	food: "🍗",
	energy: "⚡",
};

const stats = computed(() => store.state.stats);

function startGameLoop() {
	decreaseStats();
}

function decreaseStats() {
	const decreaseInterval = 12 * 1000;
	loopTimeoutId.value = setTimeout(() => {
		if (isActive) {
			store.commit("decrease", { stat: "water", amount: 3 });
			store.commit("decrease", { stat: "food", amount: 2 });
			store.commit("decrease", { stat: "energy", amount: 2 });
			if (store.state.isSick) {
				store.commit("decrease", { stat: "health", amount: 2 });
			}

			this.decreaseStats();
		}
	}, decreaseInterval);
}
</script>

<style lang="scss">
.Stats {
	display: flex;
	margin: 0;
	padding: 0;
	list-style: none;
	&__item {
		margin: 0;
		white-space: nowrap;
		padding: 0.1em 1em 0.1em 0;
		@media screen and (min-width: 680px) {
			margin: 1em 0;
			padding-left: 1em;
		}
	}
	&__icon {
		filter: grayscale(50%);
	}
}
.warning {
	color: #fa0;
}
.danger {
	color: #c00;
}
</style>
