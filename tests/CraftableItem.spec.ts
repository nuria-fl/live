import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/vue";

import CraftableItem from "../src/components/CraftableItem.vue";
import { render } from "./storeRenderer";

describe("CraftableItem", () => {
	test("Emits craft event", async () => {
		const user = userEvent.setup();

		const item = {
			name: "Bow",
			description: "",
			itemsNeeded: ["string", "wood"],
			toolsNeeded: [],
			upgradesNeeded: [],
			result: ["bow"],
			category: "weapon",
			isCraftable: true,
		};

		const container = render(CraftableItem, {
			props: {
				item,
			},
		});

		const button = screen.getByRole("button", { name: /craft/i });

		await user.click(button);

		expect(container.emitted()).toHaveProperty("craft");
	});
});
