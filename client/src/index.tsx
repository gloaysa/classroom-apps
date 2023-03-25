import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store, { persistedStore } from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserListComponent from './components/user-list/user-list.component';
import { PersistGate } from 'redux-persist/integration/react';
import SpinnerComponent from './components/spinner/spinner.component';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>Page not found</div>,
		children: [
			{
				errorElement: <div>Page not found</div>,
				children: [
					{ index: true, element: <App /> },
					{
						path: 'login',
						element: <div>login page</div>,
					},
					{
						path: '/',
						element: <UserListComponent />,
					},
				],
			},
		],
	},
]);

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={<SpinnerComponent />} persistor={persistedStore}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
