import { defineStore } from "pinia";

import names from "../utils/names";
import tracking from "../utils/tracking";

export const useStatusStore = defineStore("status", {
	state: () => ({
		username: "",
		gameOver: false,
		causeOfDeath: "",
		paused: false,
		disabled: false,
		daysSurvived: 0,
		currentPage: "home",
	}),
	actions: {
		disable() {
			this.disabled = true;
		},
		enable() {
			this.disabled = false;
		},
		pauseGame() {
			this.paused = true;
			this.disabled = true;
		},
		playGame() {
			this.paused = false;
			this.disabled = false;
		},
		increaseDayCount() {
			this.daysSurvived++;
		},
		die(causeOfDeath: string) {
			tracking.trackEvent("game", "game-over", causeOfDeath, this.daysSurvived);
			this.disable();
			this.causeOfDeath = causeOfDeath;
			this.gameOver = true;
		},
		initUsername() {
			if (localStorage.username) {
				this.username = localStorage.username as string;
			} else {
				this.username = names.getRandomName();
				localStorage.username = this.username;
			}
		},
		setUsername(username: string) {
			this.username = username;
			localStorage.username = username;
		},
		changePage(newPage: string) {
			this.currentPage = newPage;
		},
	},
});
