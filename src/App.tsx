import React, { createContext, useContext, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header/Header';
import Page404 from 'pages/404/404';
import DishList from 'pages/DishList/DishList';
import DishPage from 'pages/DishPage/DishPage';
import { DishFromList } from 'types/DishFromList';

type DishContextType = {
	dishList: DishFromList[];
	setDishList: (value: DishFromList[]) => void;
	dish: any;
	setDish: (value: any) => void;
	rootRef: HTMLElement | null;
};

const DishContext = createContext<DishContextType>({
	dishList: [],
	setDishList: () => {
		throw new Error('setDishList is not defined');
	},
	dish: null,
	setDish: () => {
		throw new Error('setDish is not defined');
	},
	rootRef: null,
});

export const useDishContext = () => useContext(DishContext);

const DishProvider = DishContext.Provider;

const App = () => {
	const [dishList, setDishList] = useState<DishFromList[]>([]);
	const [dish, setDish] = useState<any>(null);
	const rootRef = document.getElementById('root');

	return (
		<DishProvider
			value={{
				dishList,
				setDishList,
				dish,
				setDish,
				rootRef,
			}}
		>
			<BrowserRouter basename='/'>
				<Header />
				<Routes>
					<Route
						path='/'
						element={<DishList />}
					/>
					<Route
						path='/dish/:id'
						element={<DishPage />}
					/>
					<Route
						path='/404'
						element={<Page404 />}
					/>
					<Route
						path='*'
						element={<Page404 />}
					/>
				</Routes>
			</BrowserRouter>
		</DishProvider>
	);
};

export default App;
