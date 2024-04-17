import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';

import { DishFromList } from './types/DishFromList';
import DishList from './pages/DishList/DishLit';
import DishPage from './pages/DishPage/DishPage';
import Page404 from './pages/404/404';
import MyComponent from './components/Header/Header';

type DishContextType = {
	dishList: DishFromList[];
	setDishList: (value: DishFromList[]) => void;
	dish: any;
	setDish: (value: any) => void;
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
});

export const useDishContext = () => useContext(DishContext);

const DishProvider = DishContext.Provider;

const App = () => {
	const [dishList, setDishList] = useState<DishFromList[]>([]);
	const [dish, setDish] = useState<any>(null);

	return (
		<DishProvider
			value={{
				dishList,
				setDishList,
				dish,
				setDish,
			}}
		>
			<BrowserRouter basename='/'>
				<MyComponent />
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
		</DishProvider>
	);
};

export default App;
