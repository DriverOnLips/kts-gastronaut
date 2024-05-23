import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './styles/index.scss';
import './styles/notifications.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HelmetProvider>
			<App />
		</HelmetProvider>
	</React.StrictMode>,
);
