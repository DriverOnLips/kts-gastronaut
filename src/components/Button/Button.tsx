import cn from 'classnames';
import * as React from 'react';
import ButtonLoader from 'components/ButtonLoader/ButtonLoader';
import Text from 'components/Text/Text';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	/** Состояние загрузки */
	loading?: boolean;
	/** Текст кнопки */
	children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
	className,
	loading,
	children,
	...props
}) => {
	return (
		<button
			{...props}
			className={cn(
				className,
				styles.button,
				props.disabled && styles.button_disabled,
			)}
			disabled={props.disabled || loading}
		>
			{loading && <ButtonLoader className={styles.button__loader} />}
			<Text className={styles.button__text}>{children}</Text>
		</button>
	);
};

export default Button;
