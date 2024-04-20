import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

import { useRecipeContext } from '../../App';
import logo from 'assets/svg/logo.svg';

const Header = () => {
	const { rootRef } = useRecipeContext();
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
				<li
					className={styles.link}
					onClick={handleLogoClick}
				>
					Recipes
				</li>
			</ul>
		</nav>
	);
};

export default Header;
