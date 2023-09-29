import { createStore } from "vuex";

import actions from "./_actions";
import mutations from "./_mutations";
import { getters, state } from "./_state";

const store = createStore({
	state,
	getters,
	mutations,
	actions,
});

export default store;
