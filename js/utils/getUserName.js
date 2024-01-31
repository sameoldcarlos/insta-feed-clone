import getRandomIntInclusive from "../utils/getRandomIntInclusive.js";

const dividers = ["", "_", "."];

const normalizedText = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/ /g, '');

function getUserName(firstName, lastName) {
	const sufixes = ["", `${getRandomIntInclusive(0, 9)}${getRandomIntInclusive(0, 9)}`];

	const middle = dividers[getRandomIntInclusive(0, dividers.length - 1)];
	const prefix = dividers[getRandomIntInclusive(0, dividers.length - 2)];
	const sufix = sufixes[getRandomIntInclusive(0, sufixes.length - 1)];

	const concatUserName = `${prefix}${firstName}${middle}${lastName}${sufix}`;

	return normalizedText(concatUserName);
}

export default getUserName;
