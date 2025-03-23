import { fireEvent, render, screen } from "@testing-library/vue";

import GameStatusButton from "../src/components/GameStatusButton.vue";
import { createAppStore } from "../src/store";

// TODO: how to test after pause state has changed?

describe("GameStatusButton", () => {
	test("Calls pauseGame when clicked", async () => {
		const store = createAppStore();
		render(GameStatusButton, {
			global: {
				plugins: [store],
			},
		});

		jest.spyOn(store, "commit");
		const button = screen.getByRole("button", { name: /pause|play/i });

		await fireEvent.click(button);

		expect(store.commit).toHaveBeenCalledWith("pauseGame");
	});
});
