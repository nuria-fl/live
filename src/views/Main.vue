<template>
	<section>
		<game-over v-if="isGameOver" />
		<div v-else :class="{ paused: paused }">
			<alert />
			<notification />
			<header class="Header">
				<div class="Header__content">
					<stats />
					<days-counter />
				</div>
			</header>
			<div class="Main">
				<mobile-menu />
				<div class="Main__bd">
					<div v-show="mobileHome" class="Main__column">
						<actions />
					</div>
					<div v-show="mobileInventory" class="Main__column">
						<inventory />
					</div>
					<div v-show="mobileCrafting" class="Main__column">
						<crafting />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import Alert from "../components/Alert.vue";
import DaysCounter from "../components/DaysCounter.vue";
import GameOver from "../components/GameOver.vue";
import MobileMenu from "../components/MobileMenu.vue";
import Notification from "../components/Notification.vue";
import Stats from "../components/Stats.vue";
import { useInventoryStore } from "../store/inventory";
import { useStatusStore } from "../store/status";
import Actions from "./Actions.vue";
import Crafting from "./Crafting.vue";
import Inventory from "./Inventory.vue";

const isMobile = ref(true);

const statusStore = useStatusStore();
const inventoryStore = useInventoryStore();

const paused = statusStore.paused;
const isGameOver = statusStore.gameOver;
function mobileHome() {
	return (
		isMobile.value === false ||
		(isMobile.value && statusStore.currentPage === "home")
	);
}
function mobileInventory() {
	return (
		isMobile.value === false ||
		(isMobile.value && statusStore.currentPage === "inventory")
	);
}
function mobileCrafting() {
	return (
		isMobile.value === false ||
		(isMobile.value && statusStore.currentPage === "crafting")
	);
}

onMounted(() => {
	const bdSize = document.querySelector("body")?.getBoundingClientRect();
	isMobile.value = (bdSize?.width || 0) <= 680;
	inventoryStore.initInventory();
});
</script>

<style lang="scss">
.Header {
	width: 100%;
	position: fixed;
	z-index: 9;
	background: #ddd;
	&__content {
		max-width: 1400px;
		margin: 0 auto;
		padding: 1em;
		@media screen and (min-width: 680px) {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 1em;
		}
		@media screen and (min-width: 1400) {
			padding: 0;
		}
	}
}

.Main {
	width: 95%;
	max-width: 1400px;
	margin: 0 auto;
	padding-top: 4.2em;
	&__bd {
		@media screen and (min-width: 680px) {
			display: flex;
			justify-content: space-between;
			padding-bottom: 4em;
			> * {
				flex: 1 1 0;
			}
		}
	}
	&__column {
		@media screen and (min-width: 680px) {
			padding: 0 1em;
		}
	}
}
</style>
