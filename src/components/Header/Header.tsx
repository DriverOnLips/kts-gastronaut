import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDishContext } from '../../App';
import styles from './Header.module.scss';

const Header = () => {
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

export default Header;
