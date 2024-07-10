import { Card, theme as chakraTheme, extendTheme, StyleFunctionProps, useColorMode, } from "@chakra-ui/react";
import { inputAnatomy, cardAnatomy } from '@chakra-ui/anatomy';
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
//setting light mode by default
const defaultColor = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

//theming the placeholder color of the inputs
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers([...inputAnatomy.keys, ...cardAnatomy.keys]);
const inputStyle = definePartsStyle({
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
const variants = {//applied in ProductCards in the variant scope using colorMode
	elevatedDark: definePartsStyle({
	  container: {
		backgroundColor:'transparent',
		boxShadow:'0 0 5px 1px rgb(0, 0, 0, 0.4)'
	  }
	})
  };


// generate a global button and input style
const inputTheme = defineMultiStyleConfig({ baseStyle: inputStyle });
const cardTheme = defineMultiStyleConfig({variants});
export const indexTheme = extendTheme({
	components: {
		Button: {
			variants: {
				'industech': (props: StyleFunctionProps) => ({
					color: props.colorMode === 'dark' ? 'gray.800':'white',
					boxShadow:props.colorMode === 'dark' ? 
								'0 0 6px 1px rgb(0, 0, 0, 0.6)':'0 0 6px 1px rgb(0, 0, 0, 0.200)',
					bgGradient:props.colorMode === 'dark' ?
								'linear(to-t, #cc4c4c, #a92c2e)':'linear(to-t, #cc4c4c, #c53030)',
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
				size: 'sm',
				variant: 'industech',
			},
		},
		Input: inputTheme,
		Card: cardTheme
	},
	defaultColor,
});

