import { createContext, useContext } from 'react';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header/Header';
import MainPageRedirect from 'pages/MainPageRedirect/MainPageRedirect';
import NotFound from 'pages/NotFound/NotFound';
import RecipeList from 'pages/RecipeList/RecipeList';
import RecipePage from 'pages/RecipePage/RecipePage';

type RecipeContextType = {
	rootRef: HTMLElement | null;
};

const RecipeContext = createContext<RecipeContextType>({
	rootRef: null,
});

export const useRecipeContext = () => useContext(RecipeContext);

const RecipeProvider = RecipeContext.Provider;

const App = () => {
	const rootRef = document.getElementById('root');

	return (
		<RecipeProvider
			value={{
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
						path='/kts-gastronaut'
						element={<MainPageRedirect />}
					/>
					<Route
						path='/kts-gastronaut/'
						element={<MainPageRedirect />}
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
