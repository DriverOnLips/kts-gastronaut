import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ico from 'assets/ico/logo.ico';
import Header from 'components/Header/Header';
import { RootProvider } from 'contexts/RootContext';
import MainPageRedirect from 'pages/MainPageRedirect/MainPageRedirect';
import NotFound from 'pages/NotFound/NotFound';
import RecipeList from 'pages/RecipeList/RecipeList';
import RecipePage from 'pages/RecipePage/RecipePage';

const App = () => {
	const rootRef = document.getElementById('root');

	return (
		<RootProvider
			value={{
				rootRef,
			}}
		>
			<HelmetProvider>
				<Helmet>
					<link
						rel='icon'
						type='image/svg+xml'
						href={ico}
					/>
				</Helmet>

				{/* Used for gh-pages */}
				<BrowserRouter basename='/kts-gastronaut'>
					{/* <BrowserRouter basename='/'> */}
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
						{/* <Route
							path='/kts-gastronaut'
							element={<MainPageRedirect />}
						/> */}
						<Route
							path='*'
							element={<NotFound />}
						/>
					</Routes>
				</BrowserRouter>
			</HelmetProvider>
		</RootProvider>
	);
};

export default App;
