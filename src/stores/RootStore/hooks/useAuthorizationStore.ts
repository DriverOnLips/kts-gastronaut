import { useEffect } from 'react';
import rootStore from 'stores/RootStore/instance';
import { User } from 'types/User/User';

export const useAuthorizationStore = () => {
	const { login } = rootStore.authorization;

	useEffect(() => {
		const existingUsers = JSON.parse(
			localStorage.getItem('users') || '[]',
		) as User[];

		const user = existingUsers.find((user) => user.isLoggedIn);
		if (user) {
			login(user);
		}
	}, [login]);
};
