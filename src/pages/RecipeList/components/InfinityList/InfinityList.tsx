import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useLocalStore } from 'hooks/useLocalStore';
import RecipeListStore from 'stores/RecipeListStore/RecipeListStore';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import ExampleWrapper from './ListWrapper';

const InfinityList: React.FC = () => {
	const recipeListStore = useLocalStore(() => new RecipeListStore());
	const { recipeList, getRecipes } = recipeListStore;

	const [hasNextPage, setHasNextPage] = useState(true);
	const [isNextPageLoading, setIsNextPageLoading] = useState(false);
	const [page, setPage] = useState(2);
	const [items, setItems] = useState<RecipeFromListModel[]>(recipeList);

	const loadRecipes = async (page: number) => {
		setIsNextPageLoading(true);
		await getRecipes({ count: 100, page, query: null, type: null });
		setHasNextPage(recipeList.length > 0);
		setIsNextPageLoading(false);
	};

	const loadNextPage = useCallback(() => {
		loadRecipes(page);
		setPage((prevPage) => prevPage + 1);
	}, [page]);

	useEffect(() => {
		setItems((prevItems) => [...prevItems, ...recipeList]);
	}, [recipeList]);

	useEffect(() => {
		loadNextPage();
	}, []);

	return (
		<React.Fragment>
			<ExampleWrapper
				hasNextPage={hasNextPage}
				isNextPageLoading={isNextPageLoading}
				items={items}
				loadNextPage={loadNextPage}
			/>
		</React.Fragment>
	);
};

export default observer(InfinityList);
