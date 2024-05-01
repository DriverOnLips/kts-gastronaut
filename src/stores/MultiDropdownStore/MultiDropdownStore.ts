import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'hooks/useLocalStore';
import { IMultiDropdownStore, Option } from './types';

type PrivateFields = '_isOpen' | '_inputText' | '_options' | '_values';

export default class MultiDropdownStore
	implements IMultiDropdownStore, ILocalStore
{
	private _isOpen = false;
	private _inputText: string = '';
	private _options: Option[] = [];
	private _values: Option[] = [];

	constructor() {
		makeObservable<MultiDropdownStore, PrivateFields>(this, {
			_isOpen: observable,
			_inputText: observable,
			_options: observable,
			_values: observable,
			isOpen: computed,
			inputText: computed,
			title: computed,
			setIsOpen: action.bound,
			setInputText: action.bound,
			setValues: action.bound,
			setOptions: action.bound,
			onItemClick: action.bound,
		});
	}

	get isOpen(): boolean {
		return this._isOpen;
	}

	get values(): Option[] {
		return this._values;
	}

	get inputText(): string {
		return this._inputText;
	}

	get title(): string {
		const selectedOptions = this._options.filter((item) => item.isSelected);

		return (
			selectedOptions.map((item) => item.value).join(', ') ||
			'Choose a category'
		);
	}

	setIsOpen(value: boolean): void {
		this._isOpen = value;
	}

	setInputText(text: string): void {
		this._inputText = text;
		this.setValues(
			this._options.filter((option) => option.value.includes(text)),
		);
	}

	setValues(values: Option[]): void {
		this._values = values;
	}

	setOptions(options: Option[]): void {
		this._options = options;
	}

	onItemClick(option: Option): void {
		const newOptions = this._options.map((value) =>
			value.value === option.value
				? { ...value, isSelected: !value.isSelected }
				: value,
		);

		this.setOptions(newOptions);

		const newValues = this._values.map((value) =>
			value.value === option.value
				? { ...value, isSelected: !value.isSelected }
				: value,
		);

		this.setValues(newValues);
	}

	reset(): void {
		this.setIsOpen(false);
		this.setInputText('');
	}

	destroy(): void {
		// nothing to do
	}
}
