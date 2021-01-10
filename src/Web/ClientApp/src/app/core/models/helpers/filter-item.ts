export default interface FilterItem {
	id: string;
	name: string;
	selected: boolean;

	apply(): void;
}
