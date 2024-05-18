import { makeObservable, observable } from 'mobx';
import { ILocalStore } from 'hooks/useLocalStore';
import InputStore from 'stores/InputStore/InputStore';

export default class LoginStore implements ILocalStore {
	public usernameInput = new InputStore();
	public passwordInput = new InputStore();

	constructor() {
		makeObservable<LoginStore>(this, {
			usernameInput: observable,
			passwordInput: observable,
		});
	}

	destroy(): void {
		this.usernameInput.destroy();
		this.passwordInput.destroy();
	}
}
