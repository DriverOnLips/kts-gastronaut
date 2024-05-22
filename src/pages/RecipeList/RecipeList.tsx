/* eslint-disable react/react-in-jsx-scope */
import { observer } from 'mobx-react-lite';
import { useEffect, useCallback, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import intro from 'assets/img/intro.png';
import search from 'assets/svg/search.svg';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Loader from 'components/Loader/Loader';
import MultiDropdown from 'components/MultiDropdown/MultiDropdown';
import Pages from 'components/Pagination/Pagination';
import { useLocalStore } from 'hooks/useLocalStore';
import RecipeListStore from 'stores/RecipeListStore/RecipeListStore';
import { useQueryParamsStore } from 'stores/RootStore/hooks/useQueryParamsStore';
import InfinityList from './components/InfinityList/InfinityList';
import styles from './RecipeList.module.scss';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';

const RecipeList = () => {
	useQueryParamsStore();

	const introRef = useRef<HTMLImageElement>(null);
	const navigate = useNavigate();

	const recipeListStore = useLocalStore(() => new RecipeListStore());

	const {
		inputStore,
		dropdownStore,
		recipeList,
		isSuccess,
		pages,
		getRecipes,
	} = recipeListStore;

	const [items, setItems] = useState<RecipeFromListModel[]>(recipeList);

	const params = useMemo(
		() => new URLSearchParams(window.location.search),
		[window.location.search],
	);
	const page = useMemo(() => +(params.get('page') || 1), [params]);

	const onButtonClick = useCallback(() => {
		const newSearchParams = new URLSearchParams(window.location.search);
		newSearchParams.set('page', '1');
		navigate(`?${newSearchParams.toString()}`, { replace: true });

		setItems([]);
		loadRecipes();
	}, [params, page, getRecipes, navigate]);

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
			loadRecipes();
		},
		[navigate],
	);

	const loadRecipes = useCallback(() => {
		getRecipes({
			count: 100,
			page,
			query: params.get('query') || null,
			type: params.get('type') || null,
		});
	}, [page]);

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

	console.log(items.length);

	return (
		<div className={styles.recipe_list}>
			<>
				<img
					ref={introRef}
					src={intro}
					className={styles.recipe_list__intro}
				/>
				<div className={styles.recipe_list__input_search}>
					<div className={styles['recipe_list__input_search__input-div']}>
						<Input
							placeholder='Enter dishes'
							value={inputStore.value}
							onChange={onInputChange}
						/>
					</div>

					<div onClick={onButtonClick}>
						<Button>
							<img
								src={search}
								style={{ display: 'flex' }}
							/>
						</Button>
					</div>
				</div>
				<div className={styles.recipe_list__categories}>
					<MultiDropdown
						className={styles['recipe_list__categories-div']}
						dropdownStore={dropdownStore}
						onMultiDropdownClick={onMultiDropdownClick}
					/>
				</div>
				{items.length ? (
					<>
						<InfinityList
							recipeList={items}
							page={page}
						/>

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
