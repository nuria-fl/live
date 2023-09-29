<template>
	<nav>
		<ul class="Tabs">
			<li
				:class="{ active: currentPage === 'home' }"
				class="Tabs__tab"
				@click="goTo('home')"
			>
				Actions
			</li>
			<li
				:class="{ active: currentPage === 'inventory' }"
				class="Tabs__tab"
				@click="goTo('inventory')"
			>
				🎒 {{ length }}/{{ maxLength }}
			</li>
			<li
				:class="{ active: currentPage === 'crafting' }"
				class="Tabs__tab"
				@click="goTo('crafting')"
			>
				Crafting
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
import { MAXINVENTORY } from "../data/constants";
import { useInventoryStore } from "../store/inventory";
import { useStatusStore } from "../store/status";

const statusStore = useStatusStore();
const inventoryStore = useInventoryStore();

const length = inventoryStore.inventory.length;
const currentPage = statusStore.currentPage;
const maxLength = MAXINVENTORY;

function goTo(newPage: string) {
	statusStore.changePage(newPage);
}
</script>

<style lang="scss">
.Tabs {
	width: 100%;
	display: flex;
	margin-top: 1em;
	overflow-x: scroll;
	position: relative;

	&:before {
		content: "";
		display: block;
		width: 100%;
		height: 1px;
		position: absolute;
		bottom: 0;
		left: 0;
		background: #ddd;
	}

	@media screen and (min-width: 680px) {
		display: none;
	}

	&__tab {
		margin: 0 0.3em;
		padding: 0.8em 1em;
		border: 1px solid #ddd;
		white-space: nowrap;
		&.active {
			position: relative;
			border-bottom-color: #fff;
		}
		&:first-child {
			margin-left: 0;
		}
	}
}
</style>
