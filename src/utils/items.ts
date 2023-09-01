import items from "../data/items";

const getName = (itemId: string) => {
	const item = items.find((item) => item.id === itemId);

	return item ? item.name : itemId;
};

export default {
	getName,
};
