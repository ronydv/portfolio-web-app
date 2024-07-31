import { Card, theme as chakraTheme, extendTheme, StyleFunctionProps, useColorMode, } from "@chakra-ui/react";
import { inputAnatomy, cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

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
				'demo': (props: StyleFunctionProps) => ({
					color: props.colorMode === 'dark' ? 'gray.800':'white',
					boxShadow:props.colorMode === 'dark' ? 
								'0 0 6px 1px rgb(0, 0, 0, 0.6)':'0 0 6px 1px rgb(0, 0, 0, 0.200)',
					bgGradient:props.colorMode === 'dark' ?
								'linear(to-t, #2c7a7b, #38b2ac)':'linear(to-t, #2c7a7b, #319795)',
/* 								'linear(to-t, teal.300, teal.400)':'linear(to-t, teal.500, teal.600)', */
					_hover: {
						bgGradient:props.colorMode === 'dark' ? 
								'linear(to-t, teal.400, teal.600)':'linear(to-t, teal.600, teal.700)',
								/* 'linear(to-t, teal.400, teal.600)':'linear(to-t, teal.600, teal.700)', */
					  },
					_active:{
						bgGradient:props.colorMode === 'dark' ? 
						'linear(to-t, teal.500, teal.600)':'linear(to-t, teal.500, teal.600)',
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
				variant: 'demo',
			},
		},
		Input: inputTheme,
		Card: cardTheme
	},
	defaultColor,
});

