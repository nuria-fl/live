import { fireEvent, render, screen } from "@testing-library/vue";

import Modal from "../src/components/Modal.vue";

describe("Modal", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("It should emit update event when clicking close button", async () => {
		const { emitted } = render(Modal, {
			props: {
				visible: true,
				isCloseable: true,
			},
		});

		// Find the close button
		const closeButton = screen.getByRole("button");
		await fireEvent.click(closeButton);

		expect(emitted()["update:visible"]).toBeTruthy();
		expect(emitted()["update:visible"][0][0]).toBe(false);
	});
});
