import { ColorMode, FormControl, FormLabel, Text, Heading, Input, NumberInput, NumberInputField } from "@chakra-ui/react";
import classes from "./products-panel.module.css";

type PricingProps= {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    colorMode: ColorMode
    error:string
    setError: React.Dispatch<React.SetStateAction<string>>
}
const Pricing = ({ product, setProduct, colorMode, error, setError }:PricingProps) => {
    return (
        <section className={`${classes.pricing} ${colorMode === 'light' ? classes.light : classes.dark}`}>
            <Heading as='h2' size='sm' marginRight={10}>Pricing</Heading>
            <div className={classes['pricing-inputs']}>
                <div style={{ marginRight: 10 }}>
                    <FormControl as='fieldset' className={classes.form} isInvalid={error.includes('Product.price')}>
                        <FormLabel mt={2}>
                            {error.includes('Product.price') ? <Text color={'red'}>{'Empty Field'}</Text>
                                                             : 'Base Price'}
                        </FormLabel>
                        <NumberInput onChange={(e) => {
                            setError("");
                            setProduct({ ...product, price: parseInt(e) });
                        }}>
                            <NumberInputField placeholder="Initial price (mandatory)" />
                        </NumberInput>
                    </FormControl>
                </div>
                <div>
                    <FormLabel mt={2}>Discount</FormLabel>
                    <Input disabled={true} type='text' placeholder="Discount % (optional)" />
                </div>
            </div>
        </section>
    );
}
 
export default Pricing;