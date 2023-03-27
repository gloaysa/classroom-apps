import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import { RouterProvider } from 'react-router-dom';
import router from './index.router';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
