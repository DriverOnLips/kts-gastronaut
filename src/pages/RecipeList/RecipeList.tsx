/* eslint-disable react/react-in-jsx-scope */
import { observer } from 'mobx-react-lite';
import { useEffect, useCallback, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import intro from 'assets/img/intro.png';
import Filters from 'components/Filters/Filters';
import Loader from 'components/Loader/Loader';
import Pages from 'components/Pagination/Pagination';
import { useLocalStore } from 'hooks/useLocalStore';
import RecipeListStore from 'stores/RecipeListStore/RecipeListStore';
import { useQueryParamsStore } from 'stores/RootStore/hooks/useQueryParamsStore';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import InfinityList from './components/InfinityList/InfinityList';
import { RecipeListProvider } from './context/RecipeListContext';
import styles from './RecipeList.module.scss';

const RecipeList = () => {
	useQueryParamsStore();

	const introRef = useRef<HTMLImageElement>(null);
	const navigate = useNavigate();

	const recipeListStore = useLocalStore(() => new RecipeListStore());

	const { inputStore, dropdownStore, recipeList, pages, getRecipes } =
		recipeListStore;

	const [items, setItems] = useState<RecipeFromListModel[]>(recipeList);

	const params = useMemo(
		() => new URLSearchParams(window.location.search),
		[window.location.search],
	);
	const page = +(params.get('page') || 1);

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

	const onPaginationButtonClick = useCallback(
		(page: number) => () => {
			const newSearchParams = new URLSearchParams(window.location.search);
			newSearchParams.set('page', page.toString());
			navigate(`?${newSearchParams.toString()}`, { replace: true });

			setItems([]);
			loadRecipes(page);
		},
		[navigate, loadRecipes],
	);

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		loadRecipes();

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [page]);

	useEffect(() => {
		setItems((prevItems) => [...prevItems, ...recipeList]);
	}, [recipeList]);

	return (
		<div className={styles.recipe_list}>
			<>
				<img
					ref={introRef}
					src={intro}
					className={styles.recipe_list__intro}
				/>
				<Filters
					inputStore={inputStore}
					onInputChange={onInputChange}
					onButtonClick={onButtonClick}
					dropdownStore={dropdownStore}
					onMultiDropdownClick={onMultiDropdownClick}
				/>

				{items.length ? (
					<>
						<RecipeListProvider
							value={{
								introRef,
							}}
						>
							<InfinityList
								recipeList={items}
								page={page}
							/>
						</RecipeListProvider>
						<Pages
							page={page}
							pages={pages}
							onPageButtonClick={onPaginationButtonClick}
						/>
					</>
				) : (
					<Loader />
				)}
			</>
		</div>
	);
};

export default observer(RecipeList);
