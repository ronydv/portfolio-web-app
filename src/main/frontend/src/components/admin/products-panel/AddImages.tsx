import { Button, ColorMode, Flex, FormLabel, Grid, Heading, Image, Text, Input, Tag } from "@chakra-ui/react";
import { RiDeleteBinFill as DeleteIcon } from "react-icons/ri";
import classes from "./products-panel.module.css";
import { useState } from "react";
import { ImageObject } from "./AddProduct";

type AddImagesProps= {
    colorMode: ColorMode
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
    error:string
    setError: React.Dispatch<React.SetStateAction<string>>
    selectedImages: ImageObject[],
    setSelectedImages: React.Dispatch<React.SetStateAction<ImageObject[]>>,
    files: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
}// todo: add image to cloudinary
  const AddImages = ({ colorMode, formData, setFormData, error, setError,
                       selectedImages, setSelectedImages, files, setFiles }: AddImagesProps) => {
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        const imagesArray: ImageObject[] = newFiles.map((file) => ({
            src: URL.createObjectURL(file),
            alt: file.name,
            file:file,
        }));
        setFiles([...files,...newFiles]); 
        setSelectedImages([...selectedImages, ...imagesArray]);
        setFormData(formData);// Update the FormData from the AddProduct component
        setError("");
    };
    return (
        <div className={`${classes['product-image']} ${colorMode === 'light' ? classes.light : classes.dark}`}>
            <Heading as='h2' size='sm' marginRight={10}>Add image</Heading>

            <Flex alignItems={'center'} direction={'column'}>
                <Flex justifyContent={'center'} mt={2}>
                    <FormLabel className={classes.imagelabel} htmlFor="files">
                        {error?.includes('images')  ? <Text color={'red'}>{'Empty Files'}</Text>
                                                    : 'Select Images'}
                    </FormLabel>
                    <Input type='file' accept='image/*' id="files" onChange={handleImage} multiple hidden />
                </Flex>

                <Grid mt={2} templateColumns='repeat(3, 1fr)' gap={1}>
                    {selectedImages.length > 0 && <Button w='50px' h='50px' variant={'ghost'}
                                                            onClick={()=>{
                                                                setFiles([]);
                                                                setSelectedImages([]);
                                                            }}>
                                                    clear
                                                 </Button>}
                    {selectedImages.map((image, index) => (
                        
                        <div key={index}>
                            <Image src={image.src} alt={image.alt} w='50px' h='50px' objectFit={'cover'} />
                        </div>
                    ))}
                </Grid>

            </Flex>
        </div>
    );
};

export default AddImages;