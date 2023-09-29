/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { render as tlrenderer, RenderOptions } from "@testing-library/vue";
import { createStore } from "vuex";

import actions from "../src/store/_actions";
import mutations from "../src/store/_mutations";
import { getters, state } from "../src/store/_state";

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
