import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Text from 'components/Text/Text';
import { useLocalStore } from 'hooks/useLocalStore';
import LoginStore from 'stores/LoginStore/LoginStore';
import styles from './Login.module.scss';

const Login: React.FC = () => {
	const navigate = useNavigate();

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
						placeholder='Password'
						value={passwordInput.value}
						onChange={onPasswordInputChange}
					/>
					<Button style={{ justifyContent: 'center' }}>Login</Button>
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
