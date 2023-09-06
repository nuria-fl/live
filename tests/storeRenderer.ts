/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { render as tlrenderer, RenderOptions } from "@testing-library/vue";
import { createStore } from "vuex";

import actions from "../src/store/actions";
import mutations from "../src/store/mutations";
import { getters, state } from "../src/store/state";

export function render(component, options: RenderOptions, customStore?: any) {
	const mergedStoreInstance = createStore({
		state,
		getters,
		mutations,
		actions,
		...customStore,
	});

	return tlrenderer(component, {
		...options,
		global: {
			plugins: [mergedStoreInstance],
		},
	});
}
