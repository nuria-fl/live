<template>
	<section>
		<game-over v-if="gameOver" />
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

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

import Alert from "../components/Alert.vue";
import DaysCounter from "../components/DaysCounter.vue";
import GameOver from "../components/GameOver.vue";
import MobileMenu from "../components/MobileMenu.vue";
import Notification from "../components/Notification.vue";
import Stats from "../components/Stats.vue";
import Actions from "./Actions.vue";
import Crafting from "./Crafting.vue";
import Inventory from "./Inventory.vue";

export default defineComponent({
	components: {
		Alert,
		Actions,
		Crafting,
		Inventory,
		DaysCounter,
		MobileMenu,
		Notification,
		Stats,
		GameOver,
	},
	data() {
		return {
			navMenu: ["Actions", "Inventory", "Crafting"],
			isMobile: true,
		};
	},
	computed: {
		...mapState(["disabled", "paused", "gameOver", "currentPage"]),
		mobileHome() {
			return (
				this.isMobile === false ||
				(this.isMobile && this.currentPage === "home")
			);
		},
		mobileInventory() {
			return (
				this.isMobile === false ||
				(this.isMobile && this.currentPage === "inventory")
			);
		},
		mobileCrafting() {
			return (
				this.isMobile === false ||
				(this.isMobile && this.currentPage === "crafting")
			);
		},
	},
	mounted() {
		const bdSize = document.querySelector("body")?.getBoundingClientRect();
		this.isMobile = (bdSize?.width || 0) <= 680;
		this.initInventory();
	},
	methods: {
		...mapActions(["initInventory"]),
	},
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
