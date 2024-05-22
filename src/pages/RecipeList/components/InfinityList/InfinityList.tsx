import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import ListWrapper from './ListWrapper';
import { useNavigate } from 'react-router-dom';

type InfinityListProps = {
	recipeList: RecipeFromListModel[];
	page: number;
};

const InfinityList: React.FC<InfinityListProps> = ({ recipeList, page }) => {
	console.log(page);
	const navigate = useNavigate();

	const [hasNextPage, setHasNextPage] = useState(true);
	const [isNextPageLoading, setIsNextPageLoading] = useState(false);
	const [items, setItems] = useState<RecipeFromListModel[]>(recipeList);

	const incrementPage = () => {
		const newSearchParams = new URLSearchParams(window.location.search);
		newSearchParams.set('page', (page + 1).toString());
		navigate(`?${newSearchParams.toString()}`, { replace: true });
	};

	const loadNextPage = useCallback(() => {
		setIsNextPageLoading(true);
		incrementPage();
		setHasNextPage(recipeList.length > 0);
		setIsNextPageLoading(false);
	}, [incrementPage]);

	useEffect(() => {
		setItems((prevItems) => [...prevItems, ...recipeList]);
	}, [recipeList]);

	// useEffect(() => {
	// 	loadNextPage();
	// }, []);

	return (
		<React.Fragment>
			<ListWrapper
				hasNextPage={hasNextPage}
				isNextPageLoading={isNextPageLoading}
				items={items}
				loadNextPage={loadNextPage}
			/>
		</React.Fragment>
	);
};

export default observer(InfinityList);
