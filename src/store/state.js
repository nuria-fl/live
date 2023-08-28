import { MAX, MAXINVENTORY } from "../data/constants";
import items from "../data/items";
import recipes from "../data/recipes";
import upgrades from "../data/upgrades";

const state = {
	username: "",
	gameOver: false,
	causeOfDeath: null,
	paused: false,
	disabled: false,
	stats: {
		health: MAX,
		water: MAX,
		food: MAX,
		energy: MAX,
	},
	existingItems: items,
	inventory: [],
	hasFire: false,
	isSick: false,
	daysSurvived: 0,
	currentPage: "home",
};

const isCraftable = (state, recipe) => {
	const inventory = state.inventory.map((item) => item.id);
	const currentItems = [];

	let isCraftable;

	recipe.itemsNeeded.forEach((itemNeeded) => {
		const idx = inventory.indexOf(itemNeeded);

		if (idx !== -1) {
			// if we find the item we remove it from the temp inventory
			inventory.splice(idx, 1);
			currentItems.push(itemNeeded);
		} else {
			isCraftable = false;
		}
	});

	// TODO: is length enough? deepEqual?
	const hasItems = currentItems.length === recipe.itemsNeeded.length;

	let hasTools = true;

	if (recipe.toolsNeeded) {
		recipe.toolsNeeded.forEach((tool) => {
			const idx = inventory.indexOf(tool);

			if (idx !== -1) {
				hasTools = true;
			} else {
				hasTools = false;
			}
		});
	}

	if (hasItems && hasTools) {
		isCraftable = true;
		if (
			recipe.upgradesNeeded &&
			recipe.upgradesNeeded.indexOf("fire") > -1 &&
			!state.hasFire
		) {
			isCraftable = false;
		}
	}

	return isCraftable;
};

const getters = {
	isInventoryFull: (state) => state.inventory.length === MAXINVENTORY,
	slotsInInventoryLeft: (state) => MAXINVENTORY - state.inventory.length,
	recipes: (state) => {
		return recipes.map((recipe) => {
			return {
				...recipe,
				isCraftable: isCraftable(state, recipe),
			};
		});
	},
	upgrades: (state) => {
		return upgrades.map((upgrade) => {
			return {
				...upgrade,
				isCraftable: isCraftable(state, upgrade),
			};
		});
	},
};

export { getters, state };
