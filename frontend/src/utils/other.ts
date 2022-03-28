export type FormMode = 'create' | 'edit';

export function formatDateForInput(date: Date): string {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return `${year}-${month}-${day}`;
}

export function fixDateForTimezone(date: Date): Date {
	const offset = date.getTimezoneOffset();
	return new Date(date.getTime() + offset * 60 * 1000);
}
