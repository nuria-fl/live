const findIndexById = (uid, collection) => {
	return collection.findIndex((item) => item.uid === uid);
};

export default {
	// initUsername(state) {
	// 	if (localStorage.username) {
	// 		state.username = localStorage.username;
	// 	} else {
	// 		state.username = names.getRandomName();
	// 		localStorage.username = state.username;
	// 	}
	// },
	// setUsername(state, username) {
	// 	state.username = username;
	// 	localStorage.username = username;
	// },
	// pauseGame(state) {
	// 	state.paused = true;
	// 	state.disabled = true;
	// },
	// playGame(state) {
	// 	state.paused = false;
	// 	state.disabled = false;
	// },
	changePage(state, { newPage }) {
		state.currentPage = newPage;
	},
	// increaseDayCount(state) {
	// 	state.daysSurvived++;
	// },
	// decrease(state, { stat, amount }) {
	// 	state.stats[stat] = state.stats[stat] - amount;
	// 	if (state.stats[stat] <= 0) {
	// 		tracking.trackEvent("game", "game-over", stat, state.daysSurvived);
	// 		state.causeOfDeath = stat;
	// 		state.disabled = true;
	// 		state.gameOver = true;
	// 	}
	// },
	// increase(state, { stat, amount }) {
	// 	state.stats[stat] = state.stats[stat] + amount;
	// 	if (state.stats[stat] > MAX) {
	// 		state.stats[stat] = MAX;
	// 	}
	// },
	// degradeItem(state, uid) {
	// 	const idx = findIndexById(uid, state.inventory);

	// 	if (idx !== -1) {
	// 		state.inventory[idx].usesUntilBreakdown--;
	// 	}
	// },
	// addInventory(state, item) {
	// 	if (state.inventory.length < MAXINVENTORY) {
	// 		item.uid = utils.generateId();
	// 		state.inventory.push(item);
	// 	}
	// },
	// removeInventory(state, uid) {
	// 	const idx = findIndexById(uid, state.inventory);

	// 	if (idx !== -1) {
	// 		state.inventory.splice(idx, 1);
	// 	}
	// },
	// disable(state) {
	// 	state.disabled = true;
	// },
	// enable(state) {
	// 	state.disabled = false;
	// },
	// enableFire(state) {
	// 	state.hasFire = true;
	// },
	// disableFire(state) {
	// 	state.hasFire = false;
	// },
	// getSick(state) {
	// 	state.isSick = true;
	// },
	// getCured(state) {
	// 	state.isSick = false;
	// 	state.stats.health = MAX;
	// },
};
