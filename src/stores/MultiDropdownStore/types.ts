export interface IMultiDropdownStore {
	setIsOpen(value: boolean): void;
	setInputText(value: string): void;

	setOptions(options: Option[]): void;
	onItemClick(option: Option): void;

	reset(): void;
}

export type Option = {
	value: string;
	isSelected: boolean;
};
