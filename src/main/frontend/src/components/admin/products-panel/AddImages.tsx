import { Button, ColorMode, Flex, FormLabel, Grid, Heading, Image, Input, Tag } from "@chakra-ui/react";
import { RiDeleteBinFill as DeleteIcon } from "react-icons/ri";
import classes from "./products-panel.module.css";
import { useState } from "react";

type AddImagesProps= {
    colorMode: ColorMode
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}
type ImageObject = {
    src: string;
    alt: string;
  };
const AddImages = ({ colorMode, setProduct }: AddImagesProps) => {
    const [selectedImages, setSelectedImages] = useState<ImageObject[]>([]);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const imagesArray: ImageObject[] = files.map((file) => ({
            src: URL.createObjectURL(file),
            alt: file.name,
        }));// todo: add delete image functionality
        setSelectedImages([...selectedImages, ...imagesArray]);
    };
    return (
        <div className={`${classes['product-image']} ${colorMode === 'light' ? classes.light : classes.dark}`}>
            <Heading as='h2' size='sm' marginRight={10}>Add image</Heading>
            <Flex alignItems={'center'} direction={'column'}>
                <Flex justifyContent={'center'} mt={2}>
                    <FormLabel className={classes.imagelabel} htmlFor="files">select images</FormLabel>
                    <Input type='file' accept='image/*' id="files" onChange={handleImage} multiple hidden />
                </Flex>

                <Grid mt={2} templateColumns='repeat(3, 0.2fr)' gap={1}>
                    {selectedImages.map((image, index) => (
                        <div key={index}>
                            <Button size={'xs'} variant={'ghost'}>delete</Button>
                            <Image src={image.src} alt={image.alt} w='50px' h='50px' objectFit={'cover'} />
                        </div>
                    ))}
                </Grid>
            </Flex>
        </div>
    );
};

export default AddImages;