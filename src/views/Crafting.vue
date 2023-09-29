<template>
	<div>
		<camp-upgrades />
		<h2 class="SectionTitle">Food and water</h2>
		<ul>
			<craftable-item
				v-for="item in consumables"
				:key="item.name"
				:item="item"
				@craft="craft"
			/>
			<craftable-item
				v-for="item in medicine"
				:key="item.name"
				:item="item"
				@craft="craft"
			/>
		</ul>

		<h2 class="SectionTitle">Others</h2>
		<ul>
			<craftable-item
				v-for="item in tools"
				:key="item.name"
				:item="item"
				@craft="craft"
			/>
			<craftable-item
				v-for="item in weapons"
				:key="item.name"
				:item="item"
				@craft="craft"
			/>
			<craftable-item
				v-for="item in others"
				:key="item.name"
				:item="item"
				@craft="craft"
			/>
		</ul>
	</div>
</template>

<script setup lang="ts">
import CampUpgrades from "../components/CampUpgrades.vue";
import CraftableItem from "../components/CraftableItem.vue";
import items from "../data/items";
import { useInventoryStore } from "../store/inventory";

const inventoryStore = useInventoryStore();

const consumables = inventoryStore.recipes.filter(
	(recipe) => recipe.category === "consumable",
);

const medicine = inventoryStore.recipes.filter(
	(recipe) => recipe.category === "medicine",
);

const tools = inventoryStore.recipes.filter(
	(recipe) => recipe.category === "tool",
);

const weapons = inventoryStore.recipes.filter(
	(recipe) => recipe.category === "weapon",
);

const others = inventoryStore.recipes.filter(
	(recipe) => recipe.category === "other",
);

function craft(recipe) {
	inventoryStore.removeItemsById(recipe.itemsNeeded);
	const itemsToCraft = recipe.result.map((itemId) => {
		return items.find((item) => item.id === itemId);
	});

	itemsToCraft.forEach((item) => {
		inventoryStore.addInventory({ ...item });
	});
}
</script>
