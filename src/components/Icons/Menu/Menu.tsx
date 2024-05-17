import * as React from 'react';
import Icon, { IconProps } from '../Icon/Icon';

const Menu: React.FC<IconProps> = ({
	className,
	color,
	width,
	height,
	onClick,
}) => {
	const classes = `icon_wrapper arrow_down_icon ${className}`;
	return (
		<Icon
			viewBox='0 0 24 30'
			onClick={onClick}
			color={color}
			width={width ? width : 30}
			height={height ? height : 24}
			className={classes}
		>
			<path
				d='M28.4167 8.69568H1.58333C0.708883 8.69568 0 9.25046 0 9.93481V10.0652C0 10.7496 0.708883 11.3044 1.58333 11.3044H28.4167C29.2911 11.3044 30 10.7496 30 10.0652V9.93481C30 9.25046 29.2911 8.69568 28.4167 8.69568Z'
				fill='#B5460F'
			/>
			<path
				d='M28.4167 17.3913H1.58333C0.708883 17.3913 0 17.9461 0 18.6304V18.7609C0 19.4452 0.708883 20 1.58333 20H28.4167C29.2911 20 30 19.4452 30 18.7609V18.6304C30 17.9461 29.2911 17.3913 28.4167 17.3913Z'
				fill='#B5460F'
			/>
			<path
				d='M28.4167 0H1.58333C0.708883 0 0 0.554778 0 1.23913V1.36957C0 2.05392 0.708883 2.6087 1.58333 2.6087H28.4167C29.2911 2.6087 30 2.05392 30 1.36957V1.23913C30 0.554778 29.2911 0 28.4167 0Z'
				fill='#B5460F'
			/>
		</Icon>
	);
};
export default Menu;
