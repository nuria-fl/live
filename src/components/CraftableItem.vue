<template>
	<li>
		<article class="Item">
			<h4>{{ item.name }}</h4>
			<p>
				Items needed:
				{{ itemsNeeded }}
			</p>
			<p v-if="toolsNeeded">
				Tools needed:
				{{ toolsNeeded }}
			</p>
			<button
				:disabled="!item.isCraftable || (disabled as boolean)"
				type="button"
				class="Btn"
				@click="craft"
			>
				Craft
			</button>
			<span v-show="showFireTip"> (You need fire to craft this item) </span>
		</article>
	</li>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useInventoryStore } from "../store/inventory";
import { useStatusStore } from "../store/status";
import items from "../utils/items";

const { item } = defineProps<{ item: any }>();
const emit = defineEmits<{
	(e: "craft", item: any): void;
}>();

const { disabled } = storeToRefs(useStatusStore());
const { hasFire } = useInventoryStore();

const showFireTip = computed(() => {
	item.condition === "fire" && !hasFire;
});

const itemsNeeded = computed(() => {
	return item.itemsNeeded.map(items.getName).join(", ");
});
const toolsNeeded = computed(() => {
	if (item.toolsNeeded) {
		return item.toolsNeeded.map(items.getName).join(", ");
	}

	return false;
});

function craft() {
	emit("craft", item);
}
</script>
