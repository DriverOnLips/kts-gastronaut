/* eslint-disable react/react-in-jsx-scope */
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/svg/logo.svg';
import Filters from 'components/Filters/Filters';
import Menu from 'components/Icons/Menu/Menu';
import MenuClose from 'components/Icons/MenuClose/MenuClose';
import { useLocalStore } from 'hooks/useLocalStore';
import RecipeListStore from 'stores/RecipeListStore/RecipeListStore';
import rootStore from 'stores/RootStore/instance';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import styles from './Header.module.scss';

const Header = () => {
	const navigate = useNavigate();

	const { isLoggedIn, user, logout } = rootStore.authorization;

	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

	const handleLogoClick = useCallback(() => {
		if (location.pathname === '/') {
			const virtualizedList = document.querySelector('.virtualized_list');
			virtualizedList?.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			setIsSidebarVisible(false);
			navigate('/');
		}
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

	// filers
	const params = useMemo(
		() => new URLSearchParams(window.location.search),
		[window.location.search],
	);
	const page = +(params.get('page') || 1);

	const recipeListStore = useLocalStore(() => new RecipeListStore());

	const { inputStore, dropdownStore, recipeList, getRecipes } = recipeListStore;

	const [, setItems] = useState<RecipeFromListModel[]>(recipeList);

	const loadRecipes = useCallback(
		(pg?: number) => {
			getRecipes({
				count: 100,
				page: pg || page,
				query: params.get('query') || null,
				type: params.get('type') || null,
			});
		},
		[params, page, getRecipes],
	);

	const onButtonClick = useCallback(() => {
		const newSearchParams = new URLSearchParams(window.location.search);
		newSearchParams.set('page', '1');
		navigate(`?${newSearchParams.toString()}`, { replace: true });

		setItems([]);
		loadRecipes(1);
	}, [navigate, loadRecipes]);

	const onInputChange = useCallback(
		(value: string) => {
			inputStore.setValue(value);

			const newSearchParams = new URLSearchParams(window.location.search);
			newSearchParams.set('query', value);
			navigate(`?${newSearchParams.toString()}`, { replace: true });
		},
		[inputStore, navigate],
	);

	const onMultiDropdownClick = useCallback(
		(value: string) => {
			const newSearchParams = new URLSearchParams(window.location.search);
			value !== 'Choose a category'
				? newSearchParams.set('type', value)
				: newSearchParams.set('type', '');
			navigate(`?${newSearchParams.toString()}`, { replace: true });
		},
		[navigate],
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
					onClick={isLoggedIn ? handleUsernameClick : handleLoginClick}
				>
					{isLoggedIn ? user?.username : 'Login'}
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
				<div className={styles.mobile_sidebar__items}>
					<MenuClose
						className={styles.mobile_sidebar__items__close}
						onClick={onMenuButtonClick}
					/>
					{/* <Filters
						inputStore={inputStore}
						onInputChange={onInputChange}
						onButtonClick={onButtonClick}
						dropdownStore={dropdownStore}
						onMultiDropdownClick={onMultiDropdownClick}
					/> */}
					<ul className={styles['links-mobile']}>
						<li
							className={styles['link-mobile']}
							onClick={handleLogoClick}
						>
							Recipes
						</li>
						<li
							className={styles['link-mobile']}
							onClick={handleLogoClick}
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
