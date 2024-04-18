import React, { ReactNode } from 'react';

import './Text.scss';

type TextProps = {
	className: string;
	size: 's0' | 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7';
	text_align: 'center' | 'start' | 'end';
	weight: 'light' | 'medium' | 'bold';
	children: ReactNode;
};

const Text: React.FC<TextProps> = ({
	className,
	size,
	text_align,
	weight,
	children,
}) => {
	return (
		<span
			className={`${className} ${size} ${weight}`}
			style={{ textAlign: text_align }}
		>
			{children}
		</span>
	);
};

export default Text;
