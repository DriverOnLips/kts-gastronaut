import { useCallback } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from 'assets/svg/logo.svg';
import { useRecipeContext } from '../../App';
import styles from './Header.module.scss';

const Header = () => {
	const { rootRef } = useRecipeContext();
	const navigate = useNavigate();

	const handleLogoClick = useCallback(() => {
		if (location.pathname === '/') {
			rootRef?.scrollIntoView({ behavior: 'smooth' });
		} else {
			navigate('/');
		}
	}, [navigate, rootRef]);

	return (
		<nav className={styles.navbar_desctop}>
			<div
				className={styles.navbar__logo_div}
				onClick={handleLogoClick}
			>
				<img
					src={logo}
					className={styles.navbar__logo_img}
				/>
				<a className={styles.navbar__logo_link}>Food Client</a>
			</div>

			<ul className={styles.links}>
				<div style={{ display: 'flex', gap: '2rem' }}>
					<li
						className={styles.link}
						onClick={handleLogoClick}
					>
						Recipes
					</li>
					<li
						className={styles.link}
						onClick={handleLogoClick}
					>
						Saved
					</li>
				</div>

				<li
					className={styles.link}
					onClick={handleLogoClick}
				>
					Login
				</li>
			</ul>
		</nav>
	);
};

export default Header;
