import { theme as chakraTheme, extendTheme, StyleFunctionProps, } from "@chakra-ui/react";
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
	initialColorMode: 'light',
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
				'industech': (props: StyleFunctionProps) => ({
					color: props.colorMode === 'dark' ? 'gray.800':'white',
					boxShadow:props.colorMode === 'dark' ? 
								'0 0 6px 1px rgb(0, 0, 0, 0.6)':'0 0 6px 1px rgb(0, 0, 0, 0.200)',
					bgGradient:props.colorMode === 'dark' ?
								'linear(to-t, #e53e3e, #ae1717)':'linear(to-t, #cc4c4c, #c53030)',
/* 								'linear(to-t, teal.300, teal.400)':'linear(to-t, teal.500, teal.600)', */
					_hover: {
						bgGradient:props.colorMode === 'dark' ? 
								'linear(to-t, red.400, red.600)':'linear(to-t, red.600, red.700)',
								/* 'linear(to-t, teal.400, teal.600)':'linear(to-t, teal.600, teal.700)', */
					  },
					_active:{
						bgGradient:props.colorMode === 'dark' ? 
						'linear(to-t, red.500, red.600)':'linear(to-t, red.500, red.600)',
						/* 'linear(to-t, teal.500, teal.600)':'linear(to-t, teal.700, teal.800)', */
					}
				  }),
				solid: (props: StyleFunctionProps) => ({
					boxShadow:props.colorMode === 'dark' ? 
								'0 0 6px 1px rgb(0, 0, 0, 0.6)':'0 0 6px 1px rgb(0, 0, 0, 0.200)',
				  }),
			},
			defaultProps: {
				size: 'sm', // default is md
				variant: 'industech',
			},
		},
		Input: inputTheme,
	},
	defaultColor,
});

