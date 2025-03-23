import { fireEvent, render, screen } from "@testing-library/vue";

import CraftableItem from "../src/components/CraftableItem.vue";
import { createAppStore } from "../src/store";

describe("CraftableItem", () => {
	test("Emits craft event", async () => {
		const { emitted } = render(CraftableItem, {
			global: {
				plugins: [createAppStore()],
			},
			props: {
				item: {
					name: "Bow",
					description: "",
					itemsNeeded: ["string", "wood"],
					toolsNeeded: [],
					upgradesNeeded: [],
					result: ["bow"],
					category: "weapon",
					isCraftable: true,
				},
			},
		});

		const button = screen.getByRole("button", { name: "Craft" });
		await fireEvent.click(button);

		expect(emitted()).toHaveProperty("craft");
	});
});
