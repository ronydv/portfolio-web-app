import { Box, extendBaseTheme, theme as chakraTheme, extendTheme, StyleFunctionProps, } from "@chakra-ui/react";
import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
//This is a minimal version of ChakraProvider that only supplies theme tokens
/* const { Button,Heading } = chakraTheme.components
export const indexTheme = extendBaseTheme({
  components: {
	Button,
	Heading,
  },
}); */

//https://chakra-ui.com/docs/styled-system/customize-theme
//setting dark mode by default
const defaultColor = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

//theming the placeholder color of the inputs
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);
const baseStyle = definePartsStyle({
	field: {
		_dark: {
			_placeholder: {
				color: "gray.500"
			},
		},
		_light: {
			_placeholder: {
				color: "gray.600"
			},
		},
	},
});
// generate a global button and input style
const inputTheme = defineMultiStyleConfig({ baseStyle });
export const indexTheme = extendTheme({
	components: {
		Button: {
			variants: {
				solid: {
					boxShadow: '0 0 6px 1px rgb(0, 0, 0, 0.200)',
				},
				//other variants
			},
			defaultProps: {
				size: 'sm', // default is md
				variant: 'solid', // default is solid
				colorScheme: 'teal', // default is gray
			},
		},
		Input: inputTheme,
	},
	defaultColor,
});

