import { Box, extendBaseTheme, theme as chakraTheme, extendTheme, StyleFunctionProps, } from "@chakra-ui/react";

//This is a minimal version of ChakraProvider that only supplies theme tokens
/* const { Button,Heading } = chakraTheme.components
export const indexTheme = extendBaseTheme({
  components: {
    Button,
	Heading,
  },
}); */

//https://chakra-ui.com/docs/styled-system/customize-theme
const defaultColor = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
  }
export const indexTheme = extendTheme({ // generate a custom buttom to use in all components without props
	components: {
		Button: {
			variants:{
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
	},
	defaultColor,
});

