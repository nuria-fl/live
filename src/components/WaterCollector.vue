<template>
	<article class="Item">
		<h4>Water collector</h4>
		<template v-if="!hasWaterCollector">
			<p>
				Items needed:
				{{ itemsNeeded }}
				<br />
				Build a water collector to get rain water
			</p>
			<div class="Item__actions">
				<button
					:disabled="!item.isCraftable || disabled"
					type="button"
					class="Btn"
					@click="buildWaterCollector()"
				>
					Craft
				</button>
			</div>
		</template>
		<template v-else-if="isCollecting">
			Uses remaining: {{ usesRemaining - 1 }}<br />
			<span class="progress"> Collecting water </span>
		</template>
		<template v-else>
			Uses remaining: {{ usesRemaining - 1 }}<br />
			<button :disabled="disabled" class="Btn" @click="drinkWater">
				Drink
			</button>
			<button :disabled="disabled" class="Btn" @click="collectWater">
				Collect
			</button>
		</template>
	</article>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import { useInventoryStore } from "../store/inventory";
import { useStatsStore } from "../store/stats";
import { useStatusStore } from "../store/status";
import { eventBus } from "../utils/eventBus";
import items from "../utils/items";

const { item } = defineProps<{
	item: any;
}>();

const hasWaterCollector = ref(false);
const isCollecting = ref(false);
const usesRemaining = ref(3);
const currentTime = ref(0);
let waterTimeout: ReturnType<typeof setTimeout> | undefined;

const statsStore = useStatsStore();
const inventoryStore = useInventoryStore();
const { disabled } = storeToRefs(useStatusStore());

const itemsNeeded = item.itemsNeeded.map(items.getName).join(", ");

onMounted(() => {
	eventBus.$on("gameStatusChange", handleGameStatusChange);
});

function buildWaterCollector() {
	inventoryStore.removeItemsById(item.itemsNeeded);
	usesRemaining.value = 3;
	hasWaterCollector.value = true;
	startCollecting();
}
function startCollecting() {
	isCollecting.value = true;
	startCollectingLoop();
}
function startCollectingLoop() {
	waterTimeout = setTimeout(() => {
		currentTime.value++;
		if (currentTime.value === 60) {
			isCollecting.value = false;
			currentTime.value = 0;
		} else {
			startCollectingLoop();
		}
	}, 1000);
}
function drinkWater() {
	statsStore.increase("water", 20);
	finishUse();
}
function collectWater() {
	const hasBottle = inventoryStore.inventory.find(
		(item) => item.id === "bottle",
	);
	if (hasBottle) {
		const water = inventoryStore.existingItems.find(
			(item) => item.id === "water-clean",
		);
		inventoryStore.removeItemsById(["bottle"]);
		inventoryStore.addInventory(water!);
		finishUse();
	} else {
		eventBus.$emit("showModal", {
			body: "You need an empty bottle to collect water",
		});
	}
}
function finishUse() {
	usesRemaining.value--;

	if (usesRemaining.value === 0) {
		hasWaterCollector.value = false;
		eventBus.$emit("showNotification", {
			text: "Water collector has broken",
		});
	} else {
		startCollecting();
	}
}
function pauseWaterCollector() {
	clearTimeout(waterTimeout);
}
function handleGameStatusChange(isPaused: boolean) {
	if (hasWaterCollector.value) {
		if (isPaused) {
			pauseWaterCollector();
		} else {
			startCollectingLoop();
		}
	}
}
</script>
