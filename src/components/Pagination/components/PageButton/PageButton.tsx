import * as React from 'react';
import styles from './PageButton.module.scss';

type PageButtonProps = {
	active?: boolean;
	onClick: () => void;
	children: React.ReactNode;
};

const PageButton: React.FC<PageButtonProps> = ({
	active = false,
	onClick,
	children,
}) => {
	return (
		<button
			className={`${styles['page_button']} ${active ? styles['page_button-active'] : ''}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default PageButton;
