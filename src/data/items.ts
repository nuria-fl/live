import consumables from "./consumables";
import objects from "./objects";

export interface Item {
	uid?: string;
	id: string;
	name: string;
	description: string;
	action: "scavenge" | "hunt" | "craft";
	value: {
		health: number;
		food: number;
		water: number;
		energy: number;
	};
	risk: number;
	daysToPerish: number;
	usesUntilBreakdown: number;
	consumable: boolean;
}

const base = {
	value: {
		health: 0,
		food: 0,
		water: 0,
		energy: 0,
	},
	risk: 0,
	daysToPerish: 0,
	usesUntilBreakdown: 0,
	consumable: false,
};

const consumableItems = consumables.map((item) => ({
	...item,
	consumable: true,
}));

const items = [...objects, ...consumableItems].map((item) => {
	return {
		...base,
		...item,
	};
}) as Item[];

export default items;
