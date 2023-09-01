import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";

import { eventBus } from "../utils/eventBus";

export function useGameLoop(startGameLoop: () => void) {
	const store = useStore();

	const loopTimeoutId = ref<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	const isActive = computed(() => {
		return store.state.gameOver === false;
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
