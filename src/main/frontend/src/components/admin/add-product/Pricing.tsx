import { ColorMode, FormLabel, Heading, Input, NumberInput, NumberInputField, useColorMode } from "@chakra-ui/react";
import classes from "./add-product.module.css";

type PricingProps= {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    colorMode: ColorMode
}
const Pricing = ({ product, setProduct, colorMode }:PricingProps) => {
    return (
        <section className={`${classes.pricing} ${colorMode === 'light' ? classes.light : classes.dark}`}>
            <Heading as='h2' size='sm' marginRight={10}>Pricing</Heading>
            <div className={classes['pricing-inputs']}>
                <div style={{ marginRight: 10 }}>
                    <FormLabel mt={2}>Base Price</FormLabel>
                    <NumberInput onChange={(e) => setProduct({ ...product, price: parseInt(e) })}>
                        <NumberInputField placeholder="Initial price (mandatory)" />
                    </NumberInput>
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