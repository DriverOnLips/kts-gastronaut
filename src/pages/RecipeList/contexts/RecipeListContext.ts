import { RefObject, createContext, useContext } from 'react';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';

type RecipeListContextType = {
	recipeList: RecipeFromListModel[];
	isAtEnd: boolean;
	setIsAtEnd: (value: boolean) => void;
	increase: boolean;
	setIncrease: (value: boolean) => void;
	introRef: RefObject<HTMLImageElement> | null;
};

const RecipeListContext = createContext<RecipeListContextType>({
	recipeList: [],
	isAtEnd: false,
	setIsAtEnd: () => {
		throw new Error('setIsAtEnd is not defined');
	},
	increase: false,
	setIncrease: () => {
		throw new Error('setIncrease is not defined');
	},
	introRef: null,
});

export const useRecipeListContext = () => useContext(RecipeListContext);
export const RecipeListProvider = RecipeListContext.Provider;
