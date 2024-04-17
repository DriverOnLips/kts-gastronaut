import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DishList from './pages/DishList/DishLit';
import DishPage from './pages/DishPage/DishPage';
import Page404 from './pages/404/404';

const App: React.FC = () => {
	return (
		<BrowserRouter basename='/'>
			<Routes>
				<Route
					path='/'
					element={<DishList />}
				/>
				<Route
					path='/film/:id'
					element={<DishPage />}
				/>
				<Route
					path='*'
					element={<Page404 />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
