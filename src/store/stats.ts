import { defineStore } from "pinia";

import { MAX } from "../data/constants";
import { Stat } from "../data/Stat";
import { useStatusStore } from "./status";

export const useStatsStore = defineStore("stats", {
	state: () => ({
		health: MAX,
		water: MAX,
		food: MAX,
		energy: MAX,
		isSick: false,
	}),
	actions: {
		decrease(stat: Stat, amount: number) {
			const status = useStatusStore();
			this[stat] = this[stat] - amount;
			if (this[stat] <= 0) {
				status.die(stat);
			}
		},
		increase(stat: Stat, amount: number) {
			this[stat] = this[stat] + amount;
			if (this[stat] > MAX) {
				this[stat] = MAX;
			}
		},
		async decreaseAsync({ stat, amount, time }): Promise<void> {
			const status = useStatusStore();

			return new Promise((resolve, reject) => {
				status.disable();
				if (!status.gameOver) {
					setTimeout(() => {
						status.enable();
						this.decrease(stat, amount);
						resolve();
					}, time);
				} else {
					reject(new Error("game is over"));
				}
			});
		},
		async increaseAsync({ stat, amount, time }): Promise<void> {
			const status = useStatusStore();

			return new Promise((resolve, reject) => {
				status.disable();

				if (!status.gameOver) {
					setTimeout(() => {
						status.enable();
						this.increase(stat, amount);
						resolve();
					}, time);
				} else {
					reject(new Error("game is over"));
				}
			});
		},
		getSick() {
			this.isSick = true;
		},
		getCured() {
			this.isSick = false;
			this.health = MAX;
		},
	},
});
