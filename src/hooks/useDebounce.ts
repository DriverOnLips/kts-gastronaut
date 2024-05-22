import { useState, useEffect } from 'react';

function useDebounce(cb, delay) {
	const [debouncedCallback, setDebouncedCallback] = useState(() => () => {});

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedCallback(() => cb);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [cb, delay]);

	return debouncedCallback;
}

export default useDebounce;
