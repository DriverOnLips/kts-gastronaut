import { makeObservable, observable } from 'mobx';
import { ILocalStore } from 'hooks/useLocalStore';
import InputStore from 'stores/InputStore/InputStore';

export default class RegistrationStore implements ILocalStore {
	public usernameInput = new InputStore();
	public passwordInput = new InputStore();
	public passwordRepeatInput = new InputStore();

	constructor() {
		makeObservable<RegistrationStore>(this, {
			usernameInput: observable,
			passwordInput: observable,
			passwordRepeatInput: observable,
		});
	}

	destroy(): void {
		this.usernameInput.destroy();
		this.passwordInput.destroy();
		this.passwordRepeatInput.destroy();
	}
}
