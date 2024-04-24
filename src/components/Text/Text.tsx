import * as React from 'react';
import { ReactNode } from 'react';

import './Text.scss';

type TextProps = {
	className?: string;
	size?: 's0' | 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7';
	text_align?: 'center' | 'start' | 'end';
	weight?: 'medium' | 'bold';
	color?: 'primary' | 'secondary' | 'main';
	display?: 'flex';
	gap?: string;
	maxLines?: number;
	children: ReactNode;
};

const Text: React.FC<TextProps> = ({
	className,
	size = 's5',
	text_align = 'start',
	weight = 'medium',
	color = 'primary',
	display,
	gap,
	maxLines,
	children,
}) => {
	const style: React.CSSProperties = {
		textAlign: text_align,
		'--max-lines-count': maxLines,
	} as React.CSSProperties;

	if (display) style.display = display;
	if (gap) style.gap = gap;

	return (
		<span
			className={`${className ? className : ''} ${size} ${weight} ${color} 
      ${!!maxLines && 'max_lines'}`}
			style={style}
		>
			{children}
		</span>
	);
};

export default Text;
