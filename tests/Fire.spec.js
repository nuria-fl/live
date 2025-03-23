import { fireEvent, render, screen } from "@testing-library/vue";

import Fire from "../src/components/Fire.vue";
import { createAppStore } from "../src/store";

const createFreshStore = () => {
	const store = createAppStore();

	store.state.inventory = [];
	store.state.hasFire = false;
	store.state.disabled = false;

	return store;
};

describe("Fire", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("It should remove items from inventory when crafted", async () => {
		const store = createFreshStore();
		render(Fire, {
			props: {
				item: {
					id: "fire",
					name: "Fire",
					description: "Will allow you to cook items",
					itemsNeeded: ["wood", "flint"],
					toolsNeeded: [],
					isCraftable: true,
				},
			},
			global: {
				plugins: [store],
			},
		});

		store.state.inventory = [
			{
				id: "wood",
				name: "Wood",
				description: "Useful for crafting",
				action: "scavenge",
				usesUntilBreakdown: 0,
			},
			{
				id: "flint",
				name: "Flint",
				description: "Useful for crafting",
				action: "scavenge",
				usesUntilBreakdown: 0,
			},
		];

		jest.spyOn(store, "dispatch");

		const button = screen.getByRole("button", { name: "Craft" });

		await fireEvent.click(button);

		expect(store.dispatch).toHaveBeenCalledWith("removeItemsById", [
			"wood",
			"flint",
		]);
		expect(store.state.inventory).toHaveLength(0);
	});

	test("It should call enableFire when crafted", async () => {
		const store = createFreshStore();
		render(Fire, {
			props: {
				item: {
					id: "fire",
					name: "Fire",
					description: "Will allow you to cook items",
					itemsNeeded: ["wood", "flint"],
					toolsNeeded: [],
					isCraftable: true,
				},
			},
			global: {
				plugins: [store],
			},
		});
		store.state.inventory = [
			{
				id: "wood",
				name: "Wood",
				description: "Useful for crafting",
				action: "scavenge",
				usesUntilBreakdown: 0,
			},
			{
				id: "flint",
				name: "Flint",
				description: "Useful for crafting",
				action: "scavenge",
				usesUntilBreakdown: 0,
			},
		];

		jest.spyOn(store, "dispatch");
		jest.spyOn(store, "commit");

		const button = screen.getByRole("button", { name: "Craft" });

		await fireEvent.click(button);

		expect(store.commit).toHaveBeenCalledWith("enableFire");
	});
});
