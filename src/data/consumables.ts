import { Item } from "./items";

const consumables: Partial<Item>[] = [
	{
		id: "berries",
		name: "Berries",
		description: "Small amount of vitamins and water",
		action: "scavenge",
		value: {
			health: 0,
			food: 3,
			water: 3,
			energy: 0,
		},
		risk: 0,
		daysToPerish: 5,
	},
	{
		id: "meat",
		name: "Raw meat",
		description: "Careful, might have parasites!",
		action: "craft",
		value: {
			health: 0,
			food: 20,
			water: 0,
			energy: 0,
		},
		risk: 6,
		daysToPerish: 3,
	},
	{
		id: "water-dirty",
		name: "Dirty Water",
		description: "It will calm your thirst, but might make you sick",
		action: "scavenge",
		value: {
			health: 0,
			food: 0,
			water: 20,
			energy: 0,
		},
		risk: 6,
		daysToPerish: 0,
	},
	{
		id: "jerky",
		name: "Jerky",
		description: "Long lasting nourishment",
		action: "craft",
		value: {
			health: 0,
			food: 20,
			water: 0,
			energy: 0,
		},
		risk: 0,
		daysToPerish: 0,
	},
	{
		id: "medicinal-tea",
		name: "Medicinal tea",
		description: "Cures you from sickness and restores health",
		action: "craft",
		value: {
			health: 50,
			food: 0,
			water: 20,
			energy: 0,
		},
		risk: 0,
		daysToPerish: 0,
	},
	{
		id: "meat-cooked",
		name: "Cooked meat",
		description: "Tasty nourishment",
		action: "craft",
		value: {
			health: 0,
			food: 20,
			water: 0,
			energy: 0,
		},
		risk: 0,
		daysToPerish: 10,
	},
	{
		id: "water-clean",
		name: "Clean water",
		description: "Safe for drink",
		action: "craft",
		value: {
			health: 0,
			food: 0,
			water: 20,
			energy: 0,
		},
		risk: 0,
		daysToPerish: 0,
	},
];

export default consumables;