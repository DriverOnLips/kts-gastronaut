import { action, computed, makeObservable, observable } from 'mobx';
import { toast } from 'sonner';
import { User } from 'types/User/User';

type PrivateFields = '_isLoggedIn' | '_user';

export default class AuthorizationStore {
	private _isLoggedIn = false;
	private _user: User | null = null;

	constructor() {
		makeObservable<AuthorizationStore, PrivateFields>(this, {
			_isLoggedIn: observable,
			_user: observable,
			isLoggedIn: computed,
			user: computed,
			login: action.bound,
			logout: action.bound,
		});
	}

	get isLoggedIn(): boolean {
		return this._isLoggedIn;
	}

	get user(): User | null {
		return this._user;
	}

	login(user: User): void {
		const existingUsers = JSON.parse(
			localStorage.getItem('users') || '[]',
		) as User[];

		const userIndex = existingUsers.findIndex(
			(u) => u.username === user.username,
		);
		if (userIndex !== -1) {
			existingUsers[userIndex] = {
				...existingUsers[userIndex],
				isLoggedIn: true,
			};

			localStorage.setItem('users', JSON.stringify(existingUsers));
			// alert('Successfully logged in');
		}

		this._isLoggedIn = true;
		this._user = { ...user, isLoggedIn: true };
	}

	logout(): void {
		const existingUsers = JSON.parse(
			localStorage.getItem('users') || '[]',
		) as User[];

		const userIndex = existingUsers.findIndex((user) => user.isLoggedIn);
		if (userIndex !== -1) {
			existingUsers[userIndex] = {
				...existingUsers[userIndex],
				isLoggedIn: false,
			};

			localStorage.setItem('users', JSON.stringify(existingUsers));
			toast.success('Successfully logged out', {
				className: 'notification',
				duration: 2000,
			});
		}

		this._isLoggedIn = false;
		this._user = null;
	}
}
