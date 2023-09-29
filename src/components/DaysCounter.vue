<template>
	<section>Days survived: {{ daysSurvived }}</section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useGameLoop } from "../mixins/useGameLoop";
import { useStatusStore } from "../store/status";

const { loopTimeoutId, isActive } = useGameLoop(startGameLoop);

const statusStore = useStatusStore();

const daysSurvived = computed(() => statusStore.daysSurvived);

function startGameLoop() {
	startDayTimer();
}

function startDayTimer() {
	const day = 1000 * 60;
	loopTimeoutId.value = setTimeout(() => {
		if (isActive) {
			statusStore.increaseDayCount();
			startDayTimer();
		}
	}, day);
}
</script>
