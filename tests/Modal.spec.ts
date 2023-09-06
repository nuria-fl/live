import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";

import Modal from "../src/components/Modal.vue";

describe("Modal", () => {
	test("It should emit update event when clicking close button", async () => {
		const user = userEvent.setup();

		const container = render(Modal, {
			props: {
				visible: true,
				isCloseable: true,
			},
		});

		const button = screen.getByRole("button", {
			name: /ok/i,
		});

		await user.click(button);

		expect(container.emitted()).toHaveProperty("update:visible");

		const events = container.emitted("update:visible")[0] as boolean[];
		expect(events[0]).toBe(false);
	});
});
