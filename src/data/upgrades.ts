export interface Upgrade {
	id: string;
	name: string;
	description: string;
	itemsNeeded: string[];
	toolsNeeded: string[];
}

const upgrades = [
	{
		id: "fire",
		name: "Fire",
		description: "Will allow you to cook items",
		itemsNeeded: ["wood", "flint"],
		toolsNeeded: [],
	},
	{
		id: "water-collector",
		name: "Water collector",
		description: "Collects rain water",
		itemsNeeded: ["plastic", "rope", "bottle"],
		toolsNeeded: [],
	},
	// {
	//   id: 'backpack-upgrade',
	//   name: 'Backpack upgrade',
	//   description: 'Adds 5 slots to your backpack',
	//   itemsNeeded: ['rabbit-pelt', 'string'],
	//   toolsNeeded: []
	// },
];

export default upgrades;
