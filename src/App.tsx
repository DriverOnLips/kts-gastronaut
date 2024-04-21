import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header/Header';
import NotFound from 'pages/NotFound/NotFound';
import RecipeList from 'pages/RecipeList/RecipeList';
import RecipePage from 'pages/RecipePage/RecipePage';
import { RecipeFromList } from 'types/RecipeFromList';
import { RecipeType } from 'types/RecipeType';

type RecipeContextType = {
	recipeList: RecipeFromList[];
	setRecipeList: (value: RecipeFromList[]) => void;
	recipe: RecipeType | null;
	setRecipe: (value: RecipeType) => void;
	rootRef: HTMLElement | null;
};

const RecipeContext = createContext<RecipeContextType>({
	recipeList: [],
	setRecipeList: () => {
		throw new Error('setRecipeList is not defined');
	},
	recipe: null,
	setRecipe: () => {
		throw new Error('setRecipe is not defined');
	},
	rootRef: null,
});

export const useRecipeContext = () => useContext(RecipeContext);

const RecipeProvider = RecipeContext.Provider;

const App = () => {
	const [recipeList, setRecipeList] = useState<RecipeFromList[]>([]);
	const [recipe, setRecipe] = useState<RecipeType | null>(null);
	const rootRef = document.getElementById('root');

	return (
		<RecipeProvider
			value={{
				recipeList,
				setRecipeList,
				recipe,
				setRecipe,
				rootRef,
			}}
		>
			<BrowserRouter basename='/'>
				<Header />
				<Routes>
					<Route
						path='/'
						element={<RecipeList />}
					/>
					<Route
						path='/recipe/:id'
						element={<RecipePage />}
					/>
					<Route
						path='/not_found'
						element={<NotFound />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
				</Routes>
			</BrowserRouter>
		</RecipeProvider>
	);
};

export default App;
