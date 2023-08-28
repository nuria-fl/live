<template>
	<section>
		<h2 class="SectionTitle">Backpack {{ length }}/{{ maxLength }}</h2>
		<list :list="orderedList" />
	</section>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent } from "vue";
import { mapState } from "vuex";

import list from "../components/List.vue";
import { MAXINVENTORY } from "../data/constants";

export default defineComponent({
	components: {
		list,
	},
	data() {
		return {
			order: "asc",
			key: "id",
		};
	},
	computed: {
		...mapState(["inventory"]),
		length() {
			return this.inventory.length;
		},
		maxLength() {
			return MAXINVENTORY;
		},
		orderedList() {
			const aggregatedInventory = this.inventory.reduce(
				(accumulator, current) => {
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

			return _.orderBy(aggregatedInventory, this.key, this.order);
		},
	},
});
</script>
