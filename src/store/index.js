import { createStore } from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import { getters, state } from "./state";

export const createAppStore = () =>
	createStore({
		state,
		getters,
		mutations,
		actions,
	});
