// i didnt have users in the server so to make it look a bit more real i used this function to generate random names for the comments

export function nameGenerator(): string {
	const firstNames: string[] = [
		"Alice",
		"Bob",
		"Charlie",
		"Diana",
		"Edward",
		"Fiona",
		"George",
		"Hannah",
		"Ian",
		"Jasmine",
	];

	const surnames: string[] = [
		"Smith",
		"Johnson",
		"Williams",
		"Brown",
		"Jones",
		"Garcia",
		"Miller",
		"Davis",
		"Rodriguez",
		"Martinez",
	];

	const randomFirstName: string = firstNames[Math.floor(Math.random() * firstNames.length)];
	const randomSurname: string = surnames[Math.floor(Math.random() * surnames.length)];

	return `${randomFirstName} ${randomSurname}`;
}
