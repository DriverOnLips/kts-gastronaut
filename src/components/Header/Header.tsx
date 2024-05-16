/* eslint-disable react/react-in-jsx-scope */
import cn from 'classnames';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/svg/logo.svg';
import Menu from 'components/Icons/Menu/Menu';
import MenuClose from 'components/Icons/MenuClose/MenuClose';
import { useRootContext } from 'contexts/RootContext';
import styles from './Header.module.scss';

const Header = () => {
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

	const { rootRef } = useRootContext();
	const navigate = useNavigate();

	const handleLogoClick = useCallback(() => {
		if (location.pathname === '/') {
			rootRef?.scrollIntoView({ behavior: 'smooth' });
		} else {
			navigate('/');
		}
	}, [navigate, rootRef]);

	const onMenuButtonClick = useCallback(
		() => setIsSidebarVisible((prevState) => !prevState),
		[],
	);

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
				<div className={styles.links__menu}>
					<Menu onClick={onMenuButtonClick} />
				</div>
			</ul>

			<nav
				className={cn(
					styles.mobile_sidebar,
					isSidebarVisible && styles['mobile_sidebar-visible'],
				)}
			>
				<ul className={styles.mobile_sidebar__items}>
					<MenuClose
						className={styles.mobile_sidebar__items__close}
						onClick={onMenuButtonClick}
					/>
				</ul>
			</nav>
		</nav>
	);
};

export default Header;
