/* eslint-disable react/react-in-jsx-scope */
import { observer } from 'mobx-react-lite';
import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import intro from 'assets/img/intro.png';
import search from 'assets/svg/search.svg';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Loader from 'components/Loader/Loader';
import MultiDropdown from 'components/MultiDropdown/MultiDropdown';
import { useLocalStore } from 'hooks/useLocalStore';
import RecipeListStore from 'stores/RecipeListStore/RecipeListStore';
import { useQueryParamsStore } from 'stores/RootStore/hooks/useQueryParamsStore';
import { Meta } from 'utils/meta';
import List from './components/List/List';
import styles from './RecipeList.module.scss';

const RecipeList = () => {
	useQueryParamsStore();

	const offsetRef = useRef(0);

	const navigate = useNavigate();

	const recipeListStore = useLocalStore(() => new RecipeListStore());
	const { inputStore, dropdownStore, meta, recipeList, getRecipes } =
		recipeListStore;

	useEffect(() => {
		getRecipes({
			count: 100,
			offset: offsetRef.current,
			query: null,
			type: null,
		});
	}, [getRecipes]);

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

	// Used for addition data to list

	// const handleScroll = useCallback(
	// 	({ scrollTop }) => {
	// 		const totalHeight =
	// 			(recipeListStore.recipeList.length * setItemHeight()) /
	// 			getColumnCount();
	// 		console.log(scrollTop, totalHeight);
	// 		const isAtEnd = scrollTop + 1200 >= totalHeight; // 1000 - это высота контейнера
	// 		setIsAtEnd(isAtEnd);
	// 	},
	// 	[recipeListStore.recipeList.length],
	// );

	// useEffect(() => {
	// 	if (isAtEnd) {
	// 		setIsAtEnd(false);
	// 		offsetRef.current += 10;
	// 		recipeListStore.getRecipes({ count: 500, offset: offsetRef.current });
	// 	}
	// }, [isAtEnd, recipeListStore]);

	console.log(recipeList, meta);

	return (
		<div className={styles.recipe_list}>
			{meta === Meta.success ? (
				<>
					<img
						src={intro}
						className={styles.recipe_list__intro}
					/>
					<div className={`${styles.recipe_list__input_search}`}>
						<div className={styles['recipe_list__input_search__input-div']}>
							<Input
								value={inputStore.value}
								onChange={onInputChange}
								placeholder='Enter dishes'
							/>
						</div>
						<div>
							<MultiDropdown
								dropdownStore={dropdownStore}
								onMultiDropdownClick={onMultiDropdownClick}
							/>
						</div>
						<div>
							<Button>
								<img
									src={search}
									style={{ display: 'flex' }}
								/>
							</Button>
						</div>
					</div>
					<List recipeList={recipeList} />
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default observer(RecipeList);
