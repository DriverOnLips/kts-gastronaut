import React from 'react';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDishContext } from '../../App';

const MyComponent = () => {
	const { rootRef } = useDishContext();
	const navigate = useNavigate();

	const handleLogoClick = () => {
		if (location.pathname === '/') {
			rootRef?.scrollIntoView({ behavior: 'smooth' });
		} else {
			navigate('/');
		}
	};

	return (
		<nav className={styles.navbar_desctop}>
			<a
				className={styles.navbar__logo}
				onClick={handleLogoClick}
			>
				Гастронавт
			</a>
			<ul className={styles.links}>
				<li
					className={styles.link}
					onClick={handleLogoClick}
				>
					Блюда
				</li>
			</ul>
		</nav>
	);
};

export default MyComponent;
