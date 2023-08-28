<template>
	<ul class="List">
		<li v-for="item in list" :key="item.id">
			<Item :item="item" />
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Item from "../components/Item.vue";

export default defineComponent({
	name: "List",
	components: {
		Item,
	},
	props: {
		list: {
			type: Array,
			required: true,
		},
	},
});
</script>
