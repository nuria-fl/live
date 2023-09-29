<template>
	<div>
		<h2 class="SectionTitle">Actions</h2>

		<modal v-model:visible="showResults" :is-closeable="true">
			<template v-slot:body>
				<p>You got {{ lastActionResult }}</p>
			</template>
		</modal>

		<modal v-model:visible="inProgress">
			<template v-slot:body>
				<p class="progress">
					{{ currentAction }}
				</p>
			</template>
		</modal>

		<button
			v-for="action in actions"
			:key="action.name"
			:disabled="disabled"
			type="button"
			class="Btn Action"
			@click="action.method"
		>
			<h3 class="Action__title">
				{{ action.name }}
			</h3>
			<p class="Action__stats">
				{{ action.stats }}
			</p>
			<p class="Action__desc">
				{{ action.description }}
			</p>
		</button>
	</div>
</template>

<script setup lang="ts">
import modal from "../components/Modal.vue";
import { Item } from "../data/items";
import { useInventoryStore } from "../store/inventory";
import { useStatsStore } from "../store/stats";
import { useStatusStore } from "../store/status";
import utils from "../utils";
import { eventBus } from "../utils/eventBus";

const inventoryStore = useInventoryStore();
const statusStore = useStatusStore();
const statsStore = useStatsStore();

const disabled = statusStore.disabled;

let lastActionResult = "";
let currentAction = null;
let inProgress = false;
let showResults = false;
const actions = [
	{
		name: "Sleep",
		description: "Rest to replenish your energy",
		stats: "+35 energy",
		method: energy,
	},
	{
		name: "Hunt",
		description: "Hunt for food and fur to craft equipment",
		stats: "-10 energy, -10 water, -6 food",
		method: goHunt,
	},
	{
		name: "Scavenge",
		description: "Find useful items to survive",
		stats: "-5 energy, -5 water, -3 food",
		method: goScavenge,
	},
];

function scavenge({ time }) {
	return new Promise((resolve, reject) => {
		statusStore.disable();
		if (!statusStore.gameOver) {
			setTimeout(function () {
				const scavengeableItems = inventoryStore.existingItems.filter(
					(item) => item.action === "scavenge",
				);

				const numberOfItems =
					inventoryStore.slotsInInventoryLeft > 3
						? 3
						: inventoryStore.slotsInInventoryLeft;

				const newItems = utils.randomizeItems(scavengeableItems, numberOfItems);

				newItems.forEach((item) => {
					inventoryStore.addInventory(item);
				});

				statsStore.decrease("energy", 5);
				statsStore.decrease("water", 5);
				statsStore.decrease("food", 3);
				statusStore.enable();

				resolve(newItems);
			}, time);
		} else {
			reject(new Error("game is over"));
		}
	});
}
function hunt({ time, weapon }) {
	return new Promise((resolve, reject) => {
		statusStore.disable();
		if (!statusStore.gameOver) {
			setTimeout(function () {
				statsStore.decrease("energy", 10);
				statsStore.decrease("water", 10);
				statsStore.decrease("food", 6);
				statusStore.enable();

				const isSuccesful = utils.calculateProbability(8);

				if (isSuccesful) {
					inventoryStore.handleItemDegradation(weapon);
					const huntableItems = inventoryStore.existingItems.filter(
						(item) => item.action === "hunt",
					);

					const newItems = utils.randomizeItems(huntableItems, 1);

					newItems.forEach((item) => {
						inventoryStore.addInventory(item);
					});

					resolve(newItems);
				} else {
					resolve(null);
				}
			}, time);
		} else {
			reject(new Error("game is over"));
		}
	});
}
function handleFullInventory() {
	eventBus.$emit("showModal", {
		body: "Your inventory is full. Remove at least one item to proceed.",
	});
}
function energy() {
	startProgress("Sleeping");

	statsStore
		.increaseAsync({
			stat: "energy",
			amount: 35,
			time: 5000,
		})
		.then(() => {
			handleResult();
		});
}
function goHunt() {
	if (inventoryStore.isInventoryFull) {
		handleFullInventory();

		return;
	}

	const weapons = ["bow"];

	const availableWeapons = inventoryStore.inventory.filter(
		(item) => weapons.indexOf(item.id) > -1,
	);
	const hasWeapon = availableWeapons.length > 0;

	if (hasWeapon) {
		// for now there is only one weapon, later user will choose
		const weapon = availableWeapons[0];
		startProgress("Hunting");
		lastActionResult = "";

		hunt({ time: 8000, weapon }).then((items: Item[]) => {
			handleResult(items);
			if (!items) {
				eventBus.$emit("showModal", {
					body: "You were unable to track down any animal. Better luck next time.",
				});
			}
		});
	} else {
		eventBus.$emit("showModal", {
			body: "You need to craft a weapon first",
		});
	}
}
function goScavenge() {
	if (inventoryStore.isInventoryFull) {
		handleFullInventory();

		return;
	}

	startProgress("Scavenging");
	lastActionResult = "";

	scavenge({ time: 3000 }).then((items: Item[]) => {
		handleResult(items);
	});
}
function handleResult(items?: Item[]) {
	endProgress();

	if (items) {
		const itemsAcquired = items.reduce((accumulator: any[], current: any) => {
			const item = { ...current };
			const alreadyExistingItem = accumulator.find(
				(accItem) => accItem.name === item.name,
			);

			if (alreadyExistingItem) {
				alreadyExistingItem.amount++;
				alreadyExistingItem.displayName = `${alreadyExistingItem.name} x${alreadyExistingItem.amount}`;
			} else {
				item.amount = 1;
				item.displayName = item.name;
				accumulator.push(item);
			}

			return accumulator;
		}, []);

		showResults = true;
		lastActionResult = itemsAcquired.map((item) => item.displayName).join(", ");
	}
}
function startProgress(action) {
	currentAction = action;
	inProgress = true;
}
function endProgress() {
	currentAction = null;
	inProgress = false;
}
</script>

<style lang="scss">
.Action {
	display: block;
	width: 100%;
	margin: 1em 0;
	padding: 0.7em;
	border: none;
	text-align: left;

	&__title {
		margin: 0;
		font-size: 1.4em;
	}
	&__stats {
		margin: 0.2em 0;
		color: #666;
	}
	&__desc {
		margin: 0;
	}
	&:disabled &__stats {
		color: #bbb;
	}
}
.progress {
	&:after {
		content: "...";
		animation: progress 1.5s linear infinite;
		display: inline;
	}
	.paused & {
		&:after {
			display: none;
		}
	}
}

@keyframes progress {
	0% {
		content: ".";
	}
	33.333% {
		content: "..";
	}
	66.666% {
		content: "...";
	}
}
</style>
