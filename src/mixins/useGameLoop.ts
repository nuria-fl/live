import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import { useStatusStore } from "../store/status";
import { eventBus } from "../utils/eventBus";

export function useGameLoop(startGameLoop: () => void) {
	const statusStore = useStatusStore();

	const loopTimeoutId = ref<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	const isActive = computed(() => {
		return !statusStore.gameOver;
	});

	onMounted(() => {
		startGameLoop();
		eventBus.$on("gameStatusChange", handleGameStatusChange);
	});

	onBeforeUnmount(() => {
		resetGameLoop();
	});

	function resetGameLoop() {
		clearTimeout(loopTimeoutId.value);
		loopTimeoutId.value = undefined;
	}

	function handleGameStatusChange(isPaused: boolean) {
		if (isPaused) {
			resetGameLoop();
		} else {
			startGameLoop();
		}
	}

	return { loopTimeoutId, isActive };
}
