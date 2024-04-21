import * as React from 'react';
import { ReactNode } from 'react';

import './Text.scss';

type TextProps = {
	className?: string;
	size?: 's0' | 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7';
	text_align?: 'center' | 'start' | 'end';
	weight?: 'medium' | 'bold';
	color?: 'primary' | 'secondary' | 'main';
	children: ReactNode;
};

const Text: React.FC<TextProps> = ({
	className,
	size,
	text_align,
	weight,
	color,
	children,
}) => {
	return (
		<span
			className={`${className} ${size} ${weight} ${color}`}
			style={{ textAlign: text_align }}
		>
			{children}
		</span>
	);
};

export default Text;
