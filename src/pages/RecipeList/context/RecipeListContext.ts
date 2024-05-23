import { RefObject, createContext, useContext } from 'react';

type RecipeListContextType = {
	introRef: RefObject<HTMLImageElement> | null;
};

const RecipeListContext = createContext<RecipeListContextType>({
	introRef: null,
});

export const useRecipeListContext = () => useContext(RecipeListContext);
export const RecipeListProvider = RecipeListContext.Provider;
