import cn from 'classnames';
import * as React from 'react';
import LoaderV2 from 'components/LoaderV2/LoaderV2';
import TextV2 from 'components/TextV2/TextV2';
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
			{loading && (
				<LoaderV2
					className={styles.button__loader}
					size='s'
				/>
			)}
			<TextV2
				className={styles.button__text}
				tag='span'
				view='button'
			>
				{children}
			</TextV2>
		</button>
	);
};

export default Button;
