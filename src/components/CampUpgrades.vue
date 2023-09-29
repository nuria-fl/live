<template>
	<div>
		<h2 class="SectionTitle">Camp upgrades</h2>
		<ul>
			<li v-for="upgrade in upgrades" :key="upgrade.id">
				<fire v-if="upgrade.id === 'fire'" :item="upgrade" />
				<water-collector
					v-if="upgrade.id === 'water-collector'"
					:item="upgrade"
				/>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import Fire from "../components/Fire.vue";
import WaterCollector from "../components/WaterCollector.vue";
import { useInventoryStore } from "../store/inventory";

const inventoryStore = useInventoryStore();

const upgrades = inventoryStore.upgrades;
</script>
