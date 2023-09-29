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
import { useGameLoop } from "../mixins/useGameLoop";
import { useStatsStore } from "../store/stats";

const statsStore = useStatsStore();

const stats = {
	health: statsStore.health,
	water: statsStore.water,
	food: statsStore.food,
	energy: statsStore.energy,
};

const { loopTimeoutId, isActive } = useGameLoop(startGameLoop);

const icons = {
	health: "❤️",
	water: "💧",
	food: "🍗",
	energy: "⚡",
};

function startGameLoop() {
	decreaseStats();
}

function decreaseStats() {
	const decreaseInterval = 12 * 1000;
	loopTimeoutId.value = setTimeout(() => {
		if (isActive) {
			statsStore.decrease("water", 3);
			statsStore.decrease("food", 2);
			statsStore.decrease("energy", 2);

			if (statsStore.isSick) {
				statsStore.decrease("health", 2);
			}

			decreaseStats();
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
