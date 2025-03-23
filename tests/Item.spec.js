import { fireEvent, render, screen } from "@testing-library/vue";

import Item from "../src/components/Item.vue";
import { createAppStore } from "../src/store";

const createFreshStore = () => {
	const store = createAppStore();

	// Reset critical state properties
	store.state.inventory = [];
	store.state.disabled = false;

	return store;
};

// TODO: test sick/cure

describe("Item", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("Calls removeInventory when discarding", async () => {
		const store = createFreshStore();

		const { emitted } = render(Item, {
			props: {
				item: {
					id: "berries",
					name: "Berries",
					description: "Small amount of vitamins and water",
					action: "scavenge",
					consumable: true,
					value: {
						health: 0,
						food: 3,
						water: 3,
						energy: 0,
					},
					risk: 0,
					daysToPerish: 5,
					uid: "test-uid", // Add uid required for removal
				},
			},
			global: {
				plugins: [store],
			},
		});

		jest.spyOn(store, "commit");

		// Get the discard button (usually the first button)
		const discardButton = screen.getAllByRole("button")[0];
		await fireEvent.click(discardButton);

		expect(store.commit).toHaveBeenCalledWith("removeInventory", "test-uid");
	});

	test("Calls removeInventory when consuming", async () => {
		const store = createFreshStore();

		const { emitted } = render(Item, {
			props: {
				item: {
					id: "berries",
					name: "Berries",
					description: "Small amount of vitamins and water",
					action: "scavenge",
					consumable: true,
					value: {
						health: 0,
						food: 3,
						water: 3,
						energy: 0,
					},
					risk: 0,
					daysToPerish: 5,
					uid: "test-uid",
				},
			},
			global: {
				plugins: [store],
			},
		});

		jest.spyOn(store, "commit");

		// Get the consume button (usually the second button)
		const consumeButton = screen.getAllByRole("button")[1];
		await fireEvent.click(consumeButton);

		expect(store.commit).toHaveBeenCalledWith("removeInventory", "test-uid");
	});

	test("Calls increase when consuming", async () => {
		const store = createFreshStore();

		const { emitted } = render(Item, {
			props: {
				item: {
					id: "berries",
					name: "Berries",
					description: "Small amount of vitamins and water",
					action: "scavenge",
					consumable: true,
					value: {
						health: 0,
						food: 3,
						water: 3,
						energy: 0,
					},
					risk: 0,
					daysToPerish: 5,
					uid: "test-uid",
				},
			},
			global: {
				plugins: [store],
			},
		});

		jest.spyOn(store, "commit");

		// Get the consume button (usually the second button)
		const consumeButton = screen.getAllByRole("button")[1];
		await fireEvent.click(consumeButton);

		// Check for increase mutations with correct values
		expect(store.commit).toHaveBeenCalledWith("increase", {
			stat: "food",
			amount: 3,
		});
		expect(store.commit).toHaveBeenCalledWith("increase", {
			stat: "water",
			amount: 3,
		});
	});
});
