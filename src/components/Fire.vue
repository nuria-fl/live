<template>
	<article class="Item">
		<h4>Fire</h4>
		<template v-if="!inventoryStore.hasFire">
			<p>
				Items needed:
				{{ itemsNeeded }}
				<br />
				Start a fire to cook items
			</p>
			<button
				:disabled="!item.isCraftable || disabled"
				type="button"
				class="Btn"
				@click="startFire()"
			>
				Craft
			</button>
		</template>
		<div v-else>
			<p>{{ statusMessage }}</p>
			<button
				v-show="fireStatus > 0"
				:disabled="!hasWood || disabled"
				type="button"
				class="Btn"
				@click="rekindle()"
			>
				Add more wood
			</button>
		</div>
	</article>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

import { useInventoryStore } from "../store/inventory";
import { useStatusStore } from "../store/status";
import { eventBus } from "../utils/eventBus";
import items from "../utils/items";

const { item } = defineProps<{
	item: any;
}>();

const fireStatus = ref(0);
let fireLoop: ReturnType<typeof setTimeout> | undefined;
const currentTime = ref(0);

const inventoryStore = useInventoryStore();
const { disabled } = storeToRefs(useStatusStore());

const hasWood = computed(() => {
	return !!inventoryStore.inventory.find((item) => item.id === "wood");
});

const statusMessage = computed(() => {
	switch (fireStatus.value) {
		case 0:
			return "Fire is burning hot";
		case 1:
			return "Fire is burning";
		case 2:
			return "Fire is burning low";
		default:
			return "";
	}
});

const itemsNeeded = computed(() => {
	return item.itemsNeeded.map(items.getName).join(", ");
});

onMounted(() => {
	eventBus.$on("gameStatusChange", handleGameStatusChange);
});

function startFire() {
	inventoryStore.removeItemsById(item.itemsNeeded);
	inventoryStore.enableFire();
	startFireLoop();
}

function startFireLoop() {
	fireLoop = setTimeout(() => {
		currentTime.value++;
		if (currentTime.value === 60) {
			// 1000 * 60 = game day
			currentTime.value = 0;
			fireStatus.value++;
			if (fireStatus.value === 3) {
				resetFire();

				return;
			}
		}
		startFireLoop();
	}, 1000);
}

function resetFire() {
	clearTimeout(fireLoop);
	eventBus.$emit("showNotification", {
		text: "Fire has burnt out",
	});
	inventoryStore.disableFire();
	fireStatus.value = 0;
	currentTime.value = 0;
}

function rekindle() {
	inventoryStore.removeItemsById(["wood"]);
	fireStatus.value = 0;
	currentTime.value = 0;
	clearTimeout(fireLoop);
	startFireLoop();
}

function pauseFire() {
	clearTimeout(fireLoop);
}

function handleGameStatusChange(isPaused: boolean) {
	if (inventoryStore.hasFire) {
		if (isPaused) {
			pauseFire();
		} else {
			startFireLoop();
		}
	}
}
</script>
