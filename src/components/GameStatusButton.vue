<template>
	<button class="GameStatusButton" @click="toggleStatus">
		<img :src="`/${iconName}.svg`" :alt="iconName" />
	</button>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from "vue";

import { useStatusStore } from "../store/status";
import { eventBus } from "../utils/eventBus";

const statusStore = useStatusStore();

const iconName = computed(() => {
	return statusStore.paused ? "play" : "pause";
});

onMounted(() => {
	document.addEventListener("visibilitychange", handleVisibilityChange);
});

onBeforeUnmount(() => {
	document.removeEventListener("visibilitychange", handleVisibilityChange);
});

function notifyApp() {
	eventBus.$emit("gameStatusChange", statusStore.paused);
}

function toggleStatus() {
	if (statusStore.paused) {
		statusStore.playGame();
	} else {
		statusStore.pauseGame();
	}
	notifyApp();
}

function handleVisibilityChange() {
	if (document.visibilityState === "hidden") {
		statusStore.pauseGame();
	} else if (document.visibilityState === "visible") {
		statusStore.playGame();
	}
	notifyApp();
}
</script>

<style lang="scss">
.GameStatusButton {
	margin: 0;
	padding: 0.2em;
	background: #eaeaea;
	border: none;
	vertical-align: middle;
	line-height: 0;
	cursor: pointer;
}
</style>
