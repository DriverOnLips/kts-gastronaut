import { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MainPageRedirect = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (
			location.pathname === '/kts-gastronaut' ||
			location.pathname === '/kts-gastronaut/'
		)
			navigate('/');
	}, [navigate, location.pathname]);

	return null;
};

export default memo(MainPageRedirect);
