/* eslint-disable react/react-in-jsx-scope */
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/svg/logo.svg';
import Menu from 'components/Icons/Menu/Menu';
import rootStore from 'stores/RootStore/instance';
import styles from './Header.module.scss';

const Header = () => {
	const navigate = useNavigate();

	const { isLoggedIn, user, logout } = rootStore.authorization;

	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

	const handleLogoClick = () => {
		setIsSidebarVisible(false);
		if (
			location.pathname === '/'
			// location.pathname === '/kts-gastronaut' ||
			// location.pathname === '/kts-gastronaut/'
		) {
			const virtualizedList = document.querySelector('.Grid');
			virtualizedList?.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			navigate('/');
		}
	};

	const handleSavedClick = useCallback(() => {
		setIsSidebarVisible(false);
		navigate('/saved');
	}, [navigate]);

	const handleLoginClick = useCallback(() => {
		setIsSidebarVisible(false);
		navigate('/login');
	}, [navigate]);

	const handleUsernameClick = useCallback(() => {
		logout();
		setIsSidebarVisible(false);
		navigate('/login');
	}, [logout, navigate]);

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
						onClick={handleSavedClick}
					>
						Saved
					</li>
				</div>

				<li
					className={styles.link}
					onClick={isLoggedIn ? handleUsernameClick : handleLoginClick}
				>
					{isLoggedIn ? user?.username : 'Login'}
				</li>

				<div className={styles.links__menu}>
					<Menu
						onClick={onMenuButtonClick}
						isSidebarVisible={isSidebarVisible}
					/>
				</div>
			</ul>

			<nav
				className={cn(
					styles.mobile_sidebar,
					isSidebarVisible && styles['mobile_sidebar-visible'],
				)}
			>
				<div className={styles.mobile_sidebar__items}>
					<ul className={styles['links-mobile']}>
						<li
							className={styles['link-mobile']}
							onClick={handleLogoClick}
						>
							Recipes
						</li>
						<li
							className={styles['link-mobile']}
							onClick={handleSavedClick}
						>
							Saved
						</li>
						<li
							className={styles['link-mobile']}
							onClick={isLoggedIn ? handleUsernameClick : handleLoginClick}
						>
							{isLoggedIn ? user?.username : 'Login'}
						</li>
					</ul>
				</div>
			</nav>
		</nav>
	);
};

export default observer(Header);
