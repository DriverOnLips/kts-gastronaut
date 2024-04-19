import React, { ReactNode } from 'react';

type ButtonProps = {
	className?: string;
	onClick: () => void;
	type: 'default' | 'disabled';
	text: string;
};

const Button: React.FC<ButtonProps> = ({ className, onClick, type, text }) => {
	return (
		<button
			className={`${className} ${type}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
