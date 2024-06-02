/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from 'components/Header/Header';
import { RootProvider } from 'contexts/RootContext';
import Login from 'pages/Login/Login';
import NotFound from 'pages/NotFound/NotFound';
import RecipeList from 'pages/RecipeList/RecipeList';
import RecipePage from 'pages/RecipePage/RecipePage';
import Registratiom from 'pages/Registration/Registration';
import SavedRecipes from 'pages/SavedRecipes/SavedRecipes';
import { useAuthorizationStore } from 'stores/RootStore/hooks/useAuthorizationStore';

const App = () => {
	useAuthorizationStore();
	const rootRef = document.getElementById('root');

	return (
		<RootProvider
			value={{
				rootRef,
			}}
		>
			{/* Used for gh-pages */}
			{/* <BrowserRouter basename='/kts-gastronaut'> */}
			<BrowserRouter basename='/'>
				<Header />
				<Toaster position='top-center' />
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
						path='/saved'
						element={<SavedRecipes />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/registration'
						element={<Registratiom />}
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
		</RootProvider>
	);
};

export default App;
