import React from 'react';
import { useState } from '@readytogo/state';
import ErrorPage from './pages/Error/Error.jsx';
import LinksPage from './pages/Links/Links.jsx';

const App = () => {
	const defaultPage = <LinksPage />;
	const page = useState('page', defaultPage);
	if (React.isValidElement(page.getValue())) return page.getValue();
	return <ErrorPage nextPage={defaultPage}>Page Not Found</ErrorPage>;
};

export default App;

