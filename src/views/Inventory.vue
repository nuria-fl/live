<template>
	<section>
		<h2 class="SectionTitle">Backpack {{ length }}/{{ maxLength }}</h2>
		<list :list="orderedList" />
	</section>
</template>

<script setup lang="ts">
import _ from "lodash";
import { computed } from "vue";

import list from "../components/List.vue";
import { MAXINVENTORY } from "../data/constants";
import { useInventoryStore } from "../store/inventory";

const inventoryStore = useInventoryStore();
const length = computed(() => inventoryStore.inventory.length);
const maxLength = MAXINVENTORY;

const orderedList = computed(() => {
	const aggregatedInventory = inventoryStore.inventory.reduce(
		(accumulator: any[], current: any) => {
			const item = { ...current };
			const alreadyExistingItem = accumulator.find(
				(accItem) => accItem.id === item.id,
			);

			if (alreadyExistingItem) {
				alreadyExistingItem.amount++;
			} else {
				item.amount = 1;
				accumulator.push(item);
			}

			return accumulator;
		},
		[],
	);

	const order = "asc";
	const key = "id";

	return _.orderBy(aggregatedInventory, key, order);
});
</script>
