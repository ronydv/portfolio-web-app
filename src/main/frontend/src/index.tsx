import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import classes from './index.module.css'
import App from './App';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { indexTheme } from './components/themes/global-theme';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<ChakraBaseProvider theme={indexTheme}>
			<App />
		</ChakraBaseProvider>
	</React.StrictMode>
);
