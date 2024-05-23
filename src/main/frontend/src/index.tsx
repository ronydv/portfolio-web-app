import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { indexTheme } from './themes/global-theme';
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartProvider';



const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<ChakraBaseProvider theme={indexTheme}>
			<AuthProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</AuthProvider>
		</ChakraBaseProvider>
	</React.StrictMode>
);
