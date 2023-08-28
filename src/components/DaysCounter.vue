<template>
	<section>Days survived: {{ daysSurvived }}</section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

import gameLoop from "../mixins/gameLoop";

export default defineComponent({
	mixins: [gameLoop],
	computed: {
		...mapState(["gameOver", "daysSurvived"]),
		isActive() {
			return this.gameOver === false;
		},
	},
	methods: {
		...mapMutations(["increaseDayCount"]),
		startGameLoop() {
			this.startDayTimer();
		},
		startDayTimer() {
			const day = 1000 * 60;
			this.loop = setTimeout(() => {
				if (this.isActive) {
					this.increaseDayCount();
					this.startDayTimer();
				}
			}, day);
		},
	},
});
</script>
