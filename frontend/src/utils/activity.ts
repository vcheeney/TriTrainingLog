export type Activity = {
	id: string;
	sport: string;
	distance: number;
	name: string;
	date: string;
	note: string;
};

export type ActivityDto = {
	sport: string;
	distance: number;
	name: string;
	date: string;
	note: string;
};

export function getEmoji(sport: string): string {
	switch (sport) {
		case 'bike':
			return '🚴';
		case 'run':
			return '🏃';
		case 'swim':
			return '🏊';
		default:
			return '🤷‍♂️';
	}
}

export function getDistanceString(distance: number): string {
	if (distance <= 5000) {
		return `${distance} m`;
	} else {
		return `${(distance / 1000).toFixed(2)} km`;
	}
}

export function formatDateForInput(date: Date): string {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return `${year}-${month}-${day}`;
}
