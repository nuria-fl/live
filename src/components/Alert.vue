<template>
	<modal
		:is-closeable="true"
		v-model:visible="visible"
		@update:visible="closeModal"
	>
		<template v-slot:body>
			<p>
				{{ text }}
			</p>
		</template>
	</modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Modal from "../components/Modal.vue";
import { eventBus } from "../utils/eventBus";

export default defineComponent({
	components: {
		Modal,
	},
	data() {
		return {
			visible: false,
			text: "",
		};
	},
	mounted() {
		eventBus.$on("showModal", this.showModal);
	},
	methods: {
		showModal(data) {
			this.visible = true;
			this.text = data.body;
		},
		closeModal() {
			this.text = "";
		},
	},
});
</script>

<style lang="css"></style>
