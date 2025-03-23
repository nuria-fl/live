import { fireEvent, render, screen } from "@testing-library/vue";

import WaterCollector from "../src/components/WaterCollector.vue";
import { createAppStore } from "../src/store";

const createFreshStore = () => {
	const store = createAppStore();

	// Reset critical state properties
	store.state.inventory = [];
	store.state.disabled = false;

	return store;
};

describe("WaterCollector", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("It should call removeItemsById when crafted", async () => {
		const store = createFreshStore();

		render(WaterCollector, {
			props: {
				item: {
					id: "water-collector",
					name: "Water collector",
					description: "Collects rain water",
					itemsNeeded: ["plastic", "rope", "bottle"],
					toolsNeeded: [],
					isCraftable: true,
				},
			},
			global: {
				plugins: [store],
			},
		});

		// Set up necessary items in inventory
		store.state.inventory = [
			{ id: "plastic", name: "Plastic" },
			{ id: "rope", name: "Rope" },
			{ id: "bottle", name: "Bottle" },
		];

		jest.spyOn(store, "dispatch");

		const craftButton = screen.getByRole("button", { name: "Craft" });
		await fireEvent.click(craftButton);

		expect(store.dispatch).toHaveBeenCalledWith("removeItemsById", [
			"plastic",
			"rope",
			"bottle",
		]);
	});

	test("It should show water collector when crafted", async () => {
		const store = createFreshStore();

		render(WaterCollector, {
			props: {
				item: {
					id: "water-collector",
					name: "Water collector",
					description: "Collects rain water",
					itemsNeeded: ["plastic", "rope", "bottle"],
					toolsNeeded: [],
					isCraftable: true,
				},
			},
			global: {
				plugins: [store],
			},
		});

		// Set up necessary items in inventory
		store.state.inventory = [
			{ id: "plastic", name: "Plastic" },
			{ id: "rope", name: "Rope" },
			{ id: "bottle", name: "Bottle" },
		];

		jest.spyOn(store, "dispatch");

		const craftButton = screen.getByRole("button", { name: "Craft" });
		await fireEvent.click(craftButton);

		expect(screen.getByText("Collecting water")).toBeInTheDocument();
	});
});
