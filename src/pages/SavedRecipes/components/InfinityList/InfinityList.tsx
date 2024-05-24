import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback } from 'react';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import ListWrapper from './ListWrapper';

type InfinityListProps = {
	recipeList: RecipeFromListModel[];
};

const InfinityList: React.FC<InfinityListProps> = ({ recipeList }) => {
	const loadNextPage = useCallback(() => {}, []);

	return (
		<React.Fragment>
			<ListWrapper
				hasNextPage={false}
				isNextPageLoading={false}
				items={recipeList}
				loadNextPage={loadNextPage}
			/>
		</React.Fragment>
	);
};

export default observer(InfinityList);
