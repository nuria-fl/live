<template>
	<article class="Item">
		<h4>
			{{ item.name }} {{ item.amount > 1 ? `x${item.amount}` : "" }}
			<span v-if="isConsumable" class="Item__stats">
				<template v-for="(stat, key) in stats">
					<span v-if="stat > 0" :key="key"> +{{ stat }} {{ key }} </span>
				</template>
			</span>
		</h4>
		<p>{{ item.description }}</p>
		<span v-if="isBreakable">
			Uses until breakdown: {{ item.usesUntilBreakdown }}
		</span>
		<div class="Item__actions Item__actions--multi">
			<button
				v-for="action in actions"
				:key="action"
				:disabled="disabled"
				class="Btn"
				@click="doAction(action)"
			>
				{{ action }}
			</button>
		</div>
	</article>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { Item } from "../data/items";
import { Stat } from "../data/Stat";
import { useInventoryStore } from "../store/inventory";
import { useStatsStore } from "../store/stats";
import { useStatusStore } from "../store/status";
import utils from "../utils";
import { eventBus } from "../utils/eventBus";

interface ItemWithAmount extends Item {
	amount: number;
}

const { item } = defineProps<{
	item: ItemWithAmount;
}>();

const { disabled } = storeToRefs(useStatusStore());
const statsStore = useStatsStore();
const inventoryStore = useInventoryStore();

const isConsumable = item.consumable;
const isBreakable = computed(() => {
	return item.usesUntilBreakdown > 0;
});

const actions = computed(() => {
	const actions = ["discard"];
	if (isConsumable) {
		actions.push("consume");
	}

	return actions;
});

const stats = computed(() => {
	if (isConsumable) {
		return item.value;
	}

	return false;
});

function discard(item) {
	inventoryStore.removeInventory(item.uid);
}

function doAction(action) {
	if (action === "consume") {
		const infected = utils.calculateProbability(item.risk);

		if (infected && !statsStore.isSick) {
			eventBus.$emit("showModal", {
				body: "You got sick!",
			});
			statsStore.getSick();
		} else if (item.id === "medicinal-tea") {
			if (statsStore.isSick) {
				eventBus.$emit("showModal", {
					body: "You got cured!",
				});
			}
			statsStore.getCured();
		}

		Object.keys(stats).forEach((stat) => {
			statsStore.increase(stat as Stat, stats[stat]);
		});
	}

	discard(item);
}
</script>

<style lang="scss">
.Item {
	margin: 0;
	padding: 0 0 0.5em;
	border-bottom: 0.05em solid #333;
	p {
		margin: 0.2em 0;
	}
	&__stats {
		color: #666;
		font-weight: 400;
	}
	&__actions {
		width: 100%;
		display: flex;
		justify-content: space-between;
		&--multi {
			flex-direction: row-reverse;
		}
	}
}
</style>
