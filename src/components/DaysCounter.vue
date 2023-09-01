<template>
	<section>Days survived: {{ daysSurvived }}</section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import { useGameLoop } from "../mixins/useGameLoop";

const { loopTimeoutId, isActive } = useGameLoop(startGameLoop);

const store = useStore();

const daysSurvived = computed(() => store.state.daysSurvived);

function startGameLoop() {
	startDayTimer();
}

function startDayTimer() {
	const day = 1000 * 60;
	loopTimeoutId.value = setTimeout(() => {
		if (isActive) {
			store.commit("increaseDayCount");
			startDayTimer();
		}
	}, day);
}
</script>
