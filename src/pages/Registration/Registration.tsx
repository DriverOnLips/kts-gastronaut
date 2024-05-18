import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Text from 'components/Text/Text';
import { useLocalStore } from 'hooks/useLocalStore';
import RegistrationStore from 'stores/RegistrationStore/RegistrationStore';
import styles from './Registration.module.scss';

const Registration: React.FC = () => {
	const navigate = useNavigate();

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
						placeholder='Password'
						value={passwordInput.value}
						onChange={onPasswordInputChange}
					/>
					<Input
						placeholder='Repeat password'
						value={passwordRepeatInput.value}
						onChange={onPasswordRepeatInputChange}
					/>
					<Button style={{ justifyContent: 'center' }}>Create account</Button>
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
