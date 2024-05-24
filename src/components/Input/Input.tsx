import cn from 'classnames';
import * as React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Input.module.scss';

export type InputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'onChange' | 'value'
> & {
	type?: string;
	value: string;
	placeholder?: string;
	onChange: (value: string) => void;
	afterSlot?: React.ReactNode;
	disabled?: boolean;
	className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			value,
			type = 'text',
			onChange,
			afterSlot,
			disabled,
			className,
			...props
		},
		ref,
	) => {
		const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

		const changeHandler = React.useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				onChange(e.target.value);
			},
			[onChange],
		);

		const togglePasswordVisibility = () => {
			setIsPasswordVisible((prevState) => !prevState);
		};

		return (
			<label
				className={cn(
					styles['input-wrapper'],
					disabled && styles['input-wrapper_disabled'],
					className,
				)}
			>
				<input
					style={{ color: 'black' }}
					value={value}
					onChange={changeHandler}
					className={styles.input}
					ref={ref}
					disabled={disabled}
					type={isPasswordVisible && type === 'password' ? 'text' : type}
					{...props}
				/>
				{type === 'password' && (
					<button
						type='button'
						onClick={togglePasswordVisibility}
						className={styles['toggle-password-visibility']}
					>
						{isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
					</button>
				)}
				{!!afterSlot && (
					<div className={styles['input-after']}>{afterSlot}</div>
				)}
			</label>
		);
	},
);

Input.displayName = 'Input';

export default Input;
