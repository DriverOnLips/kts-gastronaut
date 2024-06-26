import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Text from 'components/Text/Text';
import { useLocalStore } from 'hooks/useLocalStore';
import RegistrationStore from 'stores/RegistrationStore/RegistrationStore';
import rootStore from 'stores/RootStore/instance';
import { User } from 'types/User/User';
import styles from './Registration.module.scss';

const Registration: React.FC = () => {
	const navigate = useNavigate();

	const { isLoggedIn, login } = rootStore.authorization;

	const registrationStore = useLocalStore(() => new RegistrationStore());
	const { usernameInput, passwordInput, passwordRepeatInput } =
		registrationStore;

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

	const onPasswordRepeatInputChange = useCallback(
		(value: string) => {
			passwordRepeatInput.setValue(value);
		},
		[passwordRepeatInput],
	);

	const onLoginClick = useCallback(() => navigate('/login'), [navigate]);

	const onCreateAccountClick = useCallback(() => {
		// empty fields
		if (
			!usernameInput.value.trim() ||
			!passwordInput.value.trim() ||
			!passwordRepeatInput.value.trim()
		) {
			toast.error('Fill in all the fields', {
				className: 'notification',
				duration: 2000,
			});

			return;
		}

		// username check
		if (
			usernameInput.value.trim().length > 8 ||
			usernameInput.value.trim().length < 4
		) {
			toast.error('Username must be between 4 and 8 characters', {
				className: 'notification',
				duration: 2000,
			});

			return;
		}

		// pw doesn't matches
		if (passwordInput.value.trim() !== passwordRepeatInput.value.trim()) {
			toast.error('Password mismatch', {
				className: 'notification',
				duration: 2000,
			});

			return;
		}

		// account creating
		const existingUsers = JSON.parse(
			localStorage.getItem('users') || '[]',
		) as User[];

		if (existingUsers.some((user) => user.username === usernameInput.value)) {
			toast.error('Username already exists', {
				className: 'notification',
				duration: 2000,
			});

			return;
		}

		const newUser = {
			username: usernameInput.value,
			password: passwordInput.value,
			isLoggedIn: true,
		};
		existingUsers.push(newUser);
		localStorage.setItem('users', JSON.stringify(existingUsers));

		toast.success('Account created successfuly', {
			className: 'notification',
			duration: 2000,
		});

		login(newUser);
		navigate('/');
	}, [usernameInput.value, passwordInput.value, login]);

	useEffect(() => {
		if (isLoggedIn) navigate('/');
	}, [isLoggedIn, navigate]);

	return (
		<div className={styles.registration}>
			<div className={styles['registration-wrapper']}>
				<Text
					size='s2'
					weight='bold'
				>
					Registration
				</Text>
				<div className={styles['registration-wrapper__inputs']}>
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
					<Input
						type='password'
						placeholder='Repeat password'
						value={passwordRepeatInput.value}
						onChange={onPasswordRepeatInputChange}
					/>
					<Button
						style={{ justifyContent: 'center' }}
						onClick={onCreateAccountClick}
					>
						Create account
					</Button>
				</div>

				<div className={styles['registration-wrapper__login']}>
					<Text size='s5'>Already have an account?</Text>
					<Text
						size='s5'
						decoration='underline'
						cursor='pointer'
						onClick={onLoginClick}
					>
						Login
					</Text>
				</div>
			</div>
		</div>
	);
};

export default observer(Registration);
