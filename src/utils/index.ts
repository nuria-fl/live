import { Item } from "../data/items";

const utils = {
	calculateProbability(probability: number) {
		const pool: boolean[] = [];

		for (let i = 0; i < 10; i++) {
			if (i < probability) {
				pool.push(true);
			} else {
				pool.push(false);
			}
		}

		const idx = utils.randomizeWithinRange(pool.length);

		return pool[idx];
	},
	randomizeWithinRange(range: number) {
		return Math.floor(Math.random() * range);
	},
	randomizeItems(source: Item[], amount: number) {
		const arr: Item[] = [];

		for (let i = 0; i < amount; i++) {
			const idx = utils.randomizeWithinRange(source.length);
			arr.push({ ...source[idx] });
		}

		return arr;
	},
	generateId() {
		return `_${Math.random().toString(36).substr(2, 9)}`;
	},
};

export default utils;
