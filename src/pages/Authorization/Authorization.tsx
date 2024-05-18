import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback } from 'react';
import Input from 'components/Input/Input';
import Text from 'components/Text/Text';
import { useLocalStore } from 'hooks/useLocalStore';
import LoginStore from 'stores/LoginStore/LoginStore';
import styles from './Login.module.scss';

const Login: React.FC = () => {
	const loginStore = useLocalStore(() => new LoginStore());
	const { loginInput, passwordInput } = loginStore;

	const onLoginInputChange = useCallback(
		(value: string) => {
			loginInput.setValue(value);
		},
		[loginInput],
	);

	const onPasswordInputChange = useCallback(
		(value: string) => {
			passwordInput.setValue(value);
		},
		[passwordInput],
	);

	return (
		<div className={styles.login}>
			<Text
				size='s2'
				weight='bold'
			>
				Login
			</Text>
			<Input
				placeholder='Login'
				value={loginInput.value}
				onChange={onLoginInputChange}
			/>
			<Input
				placeholder='Password'
				value={passwordInput.value}
				onChange={onPasswordInputChange}
			/>
			<Text size='s5'>Already have an account?</Text>
			<Text
				size='s5'
				decoration='underline'
				cursor='pointer'
			>
				Login
			</Text>
		</div>
	);
};

export default observer(Login);
