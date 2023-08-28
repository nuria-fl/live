import { shallow } from "@vue/test-utils";

import Modal from "../src/components/Modal.vue";

describe("Modal", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(Modal, {
			propsData: {
				visible: true,
				isCloseable: true,
			},
		});
	});

	test("It should emit update event when clicking close button", () => {
		wrapper.find(".Btn:last-child").trigger("click");
		expect(wrapper.emitted("update:visible")).toBeTruthy();

		// weird way to get the event payload
		expect(wrapper.emitted("update:visible")[0][0]).toBe(false);
	});
});
