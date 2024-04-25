/* eslint-disable react/react-in-jsx-scope */
import { observer } from 'mobx-react-lite';
import { useEffect, useCallback, useRef, useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { VariableSizeGrid as Grid } from 'react-window'; // Импорт VariableSizeGrid
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

interface GridItemProps {
	columnIndex: number;
	rowIndex: number;
	style: CSSProperties;
}

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

	const getColumnCount = () => {
		const screenWidth = window.innerWidth;
		if (screenWidth < 650) {
			return 1;
		} else if (screenWidth < 1200) {
			return 2;
		} else {
			return 3;
		}
	};

	const setItemHeight = () => {
		const screenWidth = window.innerWidth;
		if (screenWidth < 350) {
			return 550;
		} else if (screenWidth < 500) {
			return 600;
		} else if (screenWidth < 650) {
			return 700;
		} else if (screenWidth < 900) {
			return 600;
		} else if (screenWidth < 1200) {
			return 700;
		} else if (screenWidth < 1400) {
			return 600;
		} else if (screenWidth < 1700) {
			return 650;
		} else {
			return 700;
		}
	};

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
					<Grid
						className={`${styles.recipe_list__container}`}
						columnCount={getColumnCount()}
						columnWidth={() => {
							const columnCount = getColumnCount();
							return window.innerWidth / columnCount - 14;
						}}
						height={1000} // Высота списка
						rowCount={Math.ceil(
							recipeListStore.recipeList.length / getColumnCount(),
						)}
						rowHeight={setItemHeight} // Высота элемента
						width={window.innerWidth - 15} // Ширина списка
						style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
					>
						{({ columnIndex, rowIndex, style }: GridItemProps) => {
							const index = rowIndex * getColumnCount() + columnIndex;
							const item = recipeListStore.recipeList[index];
							if (!item) return null;

							return (
								<div
									style={style}
									className={styles.recipe_list__container_item}
								>
									<Card
										key={item.id}
										actionSlot={<Button>Save</Button>}
										captionSlot={item?.readyInMinutes + ' minutes'}
										contentSlot={item.calories + ' kcal'}
										image={item.image}
										title={item.title}
										subtitle={item.ingredients}
										onButtonClick={onCardButtonClickHandler}
										onItemClick={() => onCardItemClickHandler(item.id)}
									/>
								</div>
							);
						}}
					</Grid>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default observer(RecipeList);
