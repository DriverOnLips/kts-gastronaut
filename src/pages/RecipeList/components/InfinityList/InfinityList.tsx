import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import ListWrapper from './ListWrapper';

type InfinityListProps = {
	recipeList: RecipeFromListModel[];
	page: number;
};

const InfinityList: React.FC<InfinityListProps> = ({ recipeList, page }) => {
	const navigate = useNavigate();

	const [hasNextPage, setHasNextPage] = useState(true);
	const [isNextPageLoading, setIsNextPageLoading] = useState(false);

	const incrementPage = useCallback(() => {
		const newSearchParams = new URLSearchParams(window.location.search);
		newSearchParams.set('page', (page + 1).toString());
		navigate(`?${newSearchParams.toString()}`, { replace: true });
	}, [page, navigate]);

	const loadNextPage = useCallback(() => {
		setIsNextPageLoading(true);
		incrementPage();
		setHasNextPage(recipeList.length > 0);
		setIsNextPageLoading(false);
	}, [incrementPage]);

	return (
		<React.Fragment>
			<ListWrapper
				hasNextPage={hasNextPage}
				isNextPageLoading={isNextPageLoading}
				items={recipeList}
				loadNextPage={loadNextPage}
			/>
		</React.Fragment>
	);
};

export default observer(InfinityList);
