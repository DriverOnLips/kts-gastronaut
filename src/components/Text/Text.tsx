import * as React from 'react';
import { ReactNode } from 'react';

import './Text.scss';

type TextProps = {
	className?: string;
	size?: 's0' | 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7';
	text_align?: 'center' | 'start' | 'end';
	weight?: 'medium' | 'bold';
	color?: 'primary' | 'secondary' | 'main';
	maxLines?: number;
	children: ReactNode;
};

const Text: React.FC<TextProps> = ({
	className,
	size = 's5',
	text_align = 'start',
	weight = 'medium',
	color = 'primary',
	maxLines,
	children,
}) => {
	return (
		<span
			className={`${!!className && className} ${size} ${weight} ${color} 
      ${!!maxLines && 'max_lines'}`}
			style={
				{
					textAlign: text_align,
					'--max-lines-count': maxLines,
				} as React.CSSProperties
			}
		>
			{children}
		</span>
	);
};

export default Text;
