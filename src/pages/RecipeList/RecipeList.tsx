/* eslint-disable react/react-in-jsx-scope */
import { observer } from 'mobx-react-lite';
import { useEffect, useCallback, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import intro from 'assets/img/intro.png';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import Loader from 'components/Loader/Loader';
import { useLocalStore } from 'hooks/useLocalStore';
import RecipeListStore from 'stores/RecipeListStore/RecipeListStore';
import { useQueryParamsStoreInit } from 'stores/RootStore/hooks/useQueryParamsStoreInit';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import { Api } from 'utils/api';
import { Meta } from 'utils/meta';
import styles from './RecipeList.module.scss';

const RecipeList = () => {
	const offsetRef = useRef(0);
	const navigate = useNavigate();

	const recipeListStore = useLocalStore(() => new RecipeListStore());

	const onCardButtonClickHandler = useCallback(() => {}, []);
	const onCardItemClickHandler = useCallback(
		(id: number) => {
			navigate(`/recipe/${id}`);
		},
		[navigate],
	);

	useEffect(() => {
		recipeListStore.getRecipes({ count: 10, offset: offsetRef.current });
	}, [recipeListStore]);

	// useQueryParamsStoreInit();
	// const [searchTerm, setSearchTerm] = useState('');

	// const handleInputChange = (event) => {
	// 	setSearchTerm(event.target.value);
	// 	const newSearchParams = new URLSearchParams(window.location.search);
	// 	newSearchParams.set('search', event.target.value);
	// 	navigate(`?${newSearchParams.toString()}`, { replace: true });
	// };

	return (
		<div className={styles.recipe_list}>
			{/* <input
				type='text'
				value={searchTerm}
				onChange={handleInputChange}
				placeholder='Введите текст для поиска...'
			/> */}
			{recipeListStore.meta === Meta.success ? (
				<>
					<img
						src={intro}
						className={styles.recipe_list__intro}
					/>
					<div className={`${styles.recipe_list__container} my-1`}>
						{recipeListStore.recipeList?.map((item: RecipeFromListModel) => (
							<Card
								key={item.id}
								actionSlot={<Button>Save</Button>}
								captionSlot={item.readyInMinutes + ' minutes'}
								contentSlot={item.calories + ' kcal'}
								image={item.image}
								title={item.title}
								subtitle={item.ingredients}
								onButtonClick={onCardButtonClickHandler}
								onItemClick={() => onCardItemClickHandler(item.id)}
							/>
						))}
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default observer(RecipeList);
