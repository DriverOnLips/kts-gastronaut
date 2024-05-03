import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'hooks/useLocalStore';
import { IInputStore } from './types';

type PrivateFields = '_value';

export default class InputStore implements IInputStore, ILocalStore {
	private _value = '';

	constructor() {
		makeObservable<InputStore, PrivateFields>(this, {
			_value: observable,
			value: computed,
			setValue: action.bound,
		});
	}

	get value(): string {
		return this._value;
	}

	public setValue(value: string): void {
		this._value = value;
	}

	destroy(): void {
		// nothing to do
	}
}
