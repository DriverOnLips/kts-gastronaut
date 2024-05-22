import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import ListWrapper from './ListWrapper';
import { useNavigate } from 'react-router-dom';
import useDebounce from 'hooks/useDebounce';

type InfinityListProps = {
	recipeList: RecipeFromListModel[];
	page: number;
};

const InfinityList: React.FC<InfinityListProps> = ({ recipeList, page }) => {
	const navigate = useNavigate();

	const [hasNextPage, setHasNextPage] = useState(true);
	const [isNextPageLoading, setIsNextPageLoading] = useState(false);

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

	const debouncedLoadNextPage = useDebounce(loadNextPage, 1000);

	return (
		<React.Fragment>
			<ListWrapper
				hasNextPage={hasNextPage}
				isNextPageLoading={isNextPageLoading}
				items={recipeList}
				loadNextPage={debouncedLoadNextPage}
			/>
		</React.Fragment>
	);
};

export default observer(InfinityList);
