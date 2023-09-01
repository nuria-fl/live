import utils from ".";

const firstNames = [
	"Barbara",
	"Chloe",
	"Elaine",
	"Gisa",
	"Steve",
	"Joe",
	"Sahar",
	"Sigrid",
	"Simon",
	"Simone",
];

const lastNames = [
	"Sergeant",
	"Coupe",
	"Colton",
	"Stefanidis",
	"Marley",
	"Fabien",
	"Mulder",
	"Aitken",
	"Neuman",
	"Andela",
];

const getRandom = (arr: string[]) => {
	return arr[utils.randomizeWithinRange(arr.length)];
};

const getRandomName = () => {
	const firstName = getRandom(firstNames);
	const lastName = getRandom(lastNames);

	return `${firstName} ${lastName}`;
};

export default {
	getRandomName,
};
