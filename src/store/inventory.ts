import { defineStore } from "pinia";

import { MAXINVENTORY } from "../data/constants";
import items, { Item } from "../data/items";
import recipes, { Recipe } from "../data/recipes";
import upgrades, { Upgrade } from "../data/upgrades";
import utils from "../utils";
import { eventBus } from "../utils/eventBus";

const findIndexById = (uid: string, collection: Item[]) => {
	return collection.findIndex((item) => item.uid === uid);
};

const isCraftable = (
	inventoryState: Item[],
	hasFire: boolean,
	recipe: Recipe | Upgrade,
) => {
	const inventory = inventoryState.map((item) => item.id);
	const currentItems: string[] = [];

	let isCraftable = false;

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

	recipe.toolsNeeded.forEach((tool) => {
		const idx = inventory.indexOf(tool);

		if (idx === -1) {
			hasTools = false;
		} else {
			hasTools = true;
		}
	});

	if (hasItems && hasTools) {
		isCraftable = true;
		if (
			"upgradesNeeded" in recipe &&
			recipe.upgradesNeeded.indexOf("fire") > -1 &&
			!hasFire
		) {
			isCraftable = false;
		}
	}

	return isCraftable;
};

export const useInventoryStore = defineStore("inventory", {
	state: (): {
		existingItems: Item[];
		inventory: Item[];
		hasFire: boolean;
	} => ({
		existingItems: items,
		inventory: [],
		hasFire: false,
	}),
	getters: {
		slotsInInventoryLeft(state) {
			return MAXINVENTORY - state.inventory.length;
		},
		isInventoryFull(state) {
			return state.inventory.length === MAXINVENTORY;
		},
		recipes(state) {
			return recipes.map((recipe) => {
				return {
					...recipe,
					isCraftable: isCraftable(state.inventory, state.hasFire, recipe),
				};
			});
		},
		upgrades(state) {
			return upgrades.map((upgrade) => {
				return {
					...upgrade,
					isCraftable: isCraftable(state.inventory, state.hasFire, upgrade),
				};
			});
		},
	},
	actions: {
		initInventory() {
			const scavengeableItems = this.existingItems.filter(
				(item) => item.action === "scavenge",
			);
			const startingItems = utils.randomizeItems(scavengeableItems, 2);
			startingItems.forEach((item) => {
				this.addInventory(item);
			});
		},
		degradeItem(uid: string) {
			const idx = findIndexById(uid, this.inventory);

			if (idx !== -1) {
				this.inventory[idx].usesUntilBreakdown--;
			}
		},
		addInventory(item: Item) {
			if (this.inventory.length < MAXINVENTORY) {
				item.uid = utils.generateId();
				this.inventory.push(item);
			}
		},
		removeInventory(uid: string) {
			const idx = findIndexById(uid, this.inventory);

			if (idx !== -1) {
				this.inventory.splice(idx, 1);
			}
		},
		handleItemDegradation(item: Item) {
			if (item.usesUntilBreakdown > 1) {
				this.degradeItem(item.uid!);
			} else {
				this.removeInventory(item.uid!);
				eventBus.$emit("showNotification", {
					text: `${item.name} has broken`,
				});
			}
		},
		removeItemsById(items: string[]) {
			const findItemByName = (itemName: string) => {
				return this.inventory.find((item) => item.id === itemName);
			};

			items.forEach((itemName) => {
				const itemToRemove = findItemByName(itemName);
				if (!itemToRemove) {
					throw new Error(`Item ${itemName} not found`);
				}
				this.removeInventory(itemToRemove.uid!);
			});
		},
		enableFire() {
			this.hasFire = true;
		},
		disableFire() {
			this.hasFire = false;
		},
	},
});
