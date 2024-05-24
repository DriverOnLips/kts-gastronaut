import cn from 'classnames';
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import './Menu.scss';

type MenuProps = {
	className?: string;
	onClick: () => void;
	isSidebarVisible: boolean;
};

const Menu: React.FC<MenuProps> = ({
	className,
	onClick,
	isSidebarVisible,
}) => {
	const menuRef = useRef<HTMLDivElement>(null);

	const onMenuClick = useCallback(() => {
		menuRef?.current?.classList.toggle('change');
		onClick();
	}, [onClick]);

	useEffect(() => {
		isSidebarVisible
			? menuRef?.current?.classList.add('change')
			: menuRef?.current?.classList.remove('change');
	}, [isSidebarVisible]);

	return (
		<div
			ref={menuRef}
			className={cn('menu', className)}
			onClick={onMenuClick}
		>
			<div className='bar1'></div>
			<div className='bar2'></div>
			<div className='bar3'></div>
		</div>
	);
};
export default Menu;
