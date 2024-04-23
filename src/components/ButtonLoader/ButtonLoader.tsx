import * as React from 'react';
import l from './svg/Size=l.svg';
import m from './svg/Size=m.svg';
import s from './svg/Size=s.svg';

export type LoaderProps = {
	size?: 's' | 'm' | 'l';
	className?: string;
};

const ButtonLoader: React.FC<LoaderProps> = ({ size, className }) => {
	let imgSrc;
	switch (size) {
		case 's':
			imgSrc = s;
			break;
		case 'm':
			imgSrc = m;
			break;
		case 'l':
			imgSrc = l;
			break;
		default:
			imgSrc = l;
	}

	return (
		<img
			data-testid='loader'
			src={imgSrc}
			className={className}
			alt='Loader'
		/>
	);
};

export default ButtonLoader;
