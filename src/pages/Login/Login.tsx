import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Text from 'components/Text/Text';
import { useLocalStore } from 'hooks/useLocalStore';
import LoginStore from 'stores/LoginStore/LoginStore';
import rootStore from 'stores/RootStore/instance';
import { User } from 'types/User/User';
import styles from './Login.module.scss';

const Login: React.FC = () => {
	const navigate = useNavigate();

	const { isLoggedIn, login } = rootStore.authorization;

	const loginStore = useLocalStore(() => new LoginStore());
	const { usernameInput, passwordInput } = loginStore;

	const onUsernameInputChange = useCallback(
		(value: string) => {
			usernameInput.setValue(value);
		},
		[usernameInput],
	);

	const onPasswordInputChange = useCallback(
		(value: string) => {
			passwordInput.setValue(value);
		},
		[passwordInput],
	);

	const onAuthorizationClick = useCallback(
		() => navigate('/registration'),
		[navigate],
	);

	const onLoginClick = useCallback(() => {
		// empty fields
		if (!usernameInput.value.trim() || !passwordInput.value.trim()) {
			toast.error('Fill in all the fields', {
				className: 'notification',
				duration: 2000,
			});

			return;
		}

		// log in
		const existingUsers = JSON.parse(
			localStorage.getItem('users') || '[]',
		) as User[];

		const user = existingUsers.find(
			(user) =>
				user.username === usernameInput.value &&
				user.password === passwordInput.value,
		);

		if (user) {
			login(user);
			navigate('/');
		} else {
			toast.error('Invalid username or password', {
				className: 'notification',
				duration: 2000,
			});
		}
	}, [usernameInput.value, passwordInput.value, login, navigate]);

	useEffect(() => {
		if (isLoggedIn) navigate('/');
	}, [isLoggedIn, navigate]);

	return (
		<div className={styles.login}>
			<div className={styles['login-wrapper']}>
				<Text
					size='s2'
					weight='bold'
				>
					Login
				</Text>
				<div className={styles['login-wrapper__inputs']}>
					<Input
						placeholder='Username'
						value={usernameInput.value}
						onChange={onUsernameInputChange}
					/>
					<Input
						type='password'
						placeholder='Password'
						value={passwordInput.value}
						onChange={onPasswordInputChange}
					/>
					<Button
						style={{ justifyContent: 'center' }}
						onClick={onLoginClick}
					>
						Login
					</Button>
				</div>

				<div className={styles['login-wrapper__authorization']}>
					<Text size='s5'>No account yet?</Text>
					<Text
						size='s5'
						decoration='underline'
						cursor='pointer'
						onClick={onAuthorizationClick}
					>
						Create account
					</Text>
				</div>
			</div>
		</div>
	);
};

export default observer(Login);
