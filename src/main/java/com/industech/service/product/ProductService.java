package com.industech.service.product;

import com.industech.dto.product.*;
import com.industech.exception.ProductException;
import com.industech.model.product.*;
import com.industech.repository.product.CustomRepository;
import com.industech.repository.product.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;


@Slf4j
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CustomRepository customRepository;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private SectorService sectorService;
    @Autowired
    private TypeService typeService;

    public List<ProductDetails> getAllProducts(){
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            log.error("No products found -> getAllProducts()");
            throw new ProductException("No products found", HttpStatus.NOT_FOUND);
        } else {
            return products.stream()
                    .map(found -> {
                        ProductDetails product = new ProductDetails(found);
                        found.getProductCategories().forEach(item -> {
                            product.addCategory(new CategoryDetails(item.getCategory()));
                        });
                        for (Image image : found.getImages()) {
                            product.addImage(new ImageDetails(image));
                        }
                        return product;
                    })
                    .collect(Collectors.toList());
        }
    }

    public PaginatedProducts getProductsBySector(Integer page, Integer pageSize, String sector) {
        PageRequest pageRequest = PageRequest.of(page - 1, pageSize);
        ProductsBySector productsBySector = customRepository.findProductsBySector(sector, pageRequest);
        if (productsBySector.products().isEmpty()) {
            log.error("getAllProductsBySector() No products found for sector: {}", sector);
            throw new ProductException("No products found", HttpStatus.NOT_FOUND);
        }
        List<ProductDetails>products=productsBySector.products()
                .stream()
                .map(found -> {
                    ProductDetails product = new ProductDetails(found);
                    found.getProductCategories().forEach(item -> {
                        product.addCategory(new CategoryDetails(item.getCategory()));
                    });
                    if (!found.getImages().isEmpty()) {
                        for (Image image : found.getImages()) {
                            product.addImage(new ImageDetails(image));
                        }
                    }
                    return product;
                }).collect(Collectors.toList());
        return new PaginatedProducts(products, (int) productsBySector.total());
    }

    public PaginatedProducts getProductsByCategoriesAndTypes(Integer page,
                                                             Integer pageSize, String sector,
                                                             List<String>categories, List<String>types) {

        PageRequest pageRequest = PageRequest.of(page - 1, pageSize);
        ProductsBySector productsBySector = customRepository
                .findProductsByCategoriesAndTypes(sector,
                        categories== null || categories.isEmpty() ? null:categories,
                        types== null || types.isEmpty() ? null:types, pageRequest);

        if (productsBySector.products().isEmpty()) {
            log.error("No products found for sector: {} filtering by: {},{}", sector,categories,types);
            throw new ProductException("No products found sector: {"+sector+"} filtering by:" +
                    " {"+categories+"},{"+types+"}", HttpStatus.NOT_FOUND);
        }
        List<ProductDetails>products=productsBySector.products()
                .stream()
                .map(found -> {
                    ProductDetails product = new ProductDetails(found);
                    found.getProductCategories().forEach(item -> {
                        product.addCategory(new CategoryDetails(item.getCategory()));
                    });
                    if (!found.getImages().isEmpty()) {
                        for (Image image : found.getImages()) {
                            product.addImage(new ImageDetails(image));
                        }
                    }
                    return product;
                }).collect(Collectors.toList());
        return new PaginatedProducts(products, (int) productsBySector.total());
    }

    public ProductDetails getProductById(Integer id) {
        return productRepository.findById(id)
                .map(found -> {
                    ProductDetails product = new ProductDetails(found);
                    found.getProductCategories().forEach(item -> {
                        product.addCategory(new CategoryDetails(item.getCategory()));
                    });
                    if(!found.getImages().isEmpty()) {
                        for (Image image : found.getImages()) {
                            product.addImage(new ImageDetails(image));
                        }
                    }
                    return product;
                }).orElseGet(() -> {
                    log.error("\u001B[35mproduct not found\u001B[0m");
                    throw new ProductException("Product not found", HttpStatus.NOT_FOUND);
                });
    }

    public PaginatedProducts searchProducts(String wordsToRegex, Integer page, Integer pageSize) {
        List<String> words = Stream.of(wordsToRegex.split(" "))
                .map(String::trim).toList();
        log.info("\u001B[35mwords from the client mapped to array: " + words + "\u001B[0m");

        String regex = IntStream.range(0, words.size())
                .filter(i -> i < words.size())
                .mapToObj(i -> "(?=.*[[:<:]](" + words.get(i) + ")[[:>:]])")
                .collect(Collectors.joining("|", "(?i)^", ".*"));

        PageRequest pageRequest = PageRequest.of(page - 1, pageSize);
        if (productRepository.searchProducts(regex, pageRequest).isEmpty()) {
            log.error("No products found -> searchProducts");
            throw new ProductException("No products found", HttpStatus.NOT_FOUND);
        } else {
            Page<Product> productsByPage = productRepository.searchProducts(regex, pageRequest);
            List<ProductDetails> products = productsByPage.getContent()
                    .stream()
                    .map(product -> this.getProductById(product.getId()))
                    .collect(Collectors.toList());
            return new PaginatedProducts(products, (int)productsByPage.getTotalElements());
        }
    }

    public ProductDetails saveProduct(ProductDetails productDetails, List<MultipartFile> files) {
        if(productDetails.getSector()== null || productDetails.getSector().isEmpty()){
            throw new ProductException("Product's sector is empty", HttpStatus.BAD_REQUEST);
        }
        if(productDetails.getProductType()== null || productDetails.getProductType().isEmpty()){
            throw new ProductException("Product's type is empty", HttpStatus.BAD_REQUEST);
        }
        try {
            Product product = new Product(productDetails.getName(), productDetails.getDescription());
            //add product type
            String upperCaseType=productDetails.getProductType().substring(0, 1).toUpperCase() +
                    productDetails.getProductType().substring(1).toLowerCase();
            Type type= typeService.getType(upperCaseType);
            if(type != null) product.setTypes(new HashSet<>(Set.of(type) ) );
            else {
                product.setTypes(new HashSet<>(Set.of(new Type(upperCaseType) ) ) );
            }
            //add sector
            Sector sector= sectorService.getSector(productDetails.getSector());
            if(sector != null) product.setSectors(new HashSet<>(Set.of(sector)));
            //add images
            List<ImageDetails> images = new ArrayList<>();
            for(MultipartFile file:files){
                ImageDetails imageFile=imageService.uploadImage(file,"products");
                Image image=new Image(imageFile.getUrl(),
                                      file.getOriginalFilename(),
                                      imageFile.getPublicId());//add image to the cdn server
                product.addImage(image);
                images.add(new ImageDetails(image));//mapping image to its DTO class
            }
            //add categories
            List<CategoryDetails> categories = new ArrayList<>();
            productDetails.getCategories().forEach(categoryName -> {
                //check if the incoming list of categories exists in the database before adding to the product
                Category category = categoryService.getCategory(categoryName.getName());
                if (category != null) {
                    product.addCategory(ProductCategory.add(product, category));//map categories to the database
                    categories.add(new CategoryDetails(category));// map categories to the DTO
                }
            });
            return new ProductDetails(productRepository.save(product), categories, images);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ProductException("Error while saving product", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ProductDetails updateProduct(ProductDetails product){
        if(product.getSector()== null || product.getSector().isEmpty()){
            throw new ProductException("Product's sector is empty", HttpStatus.BAD_REQUEST);
        }
        if(product.getProductType()== null || product.getProductType().isEmpty()){
            throw new ProductException("Product's type is empty", HttpStatus.BAD_REQUEST);
        }
        try{
            Product toUpdate=productRepository.getReferenceById(product.getId());
            toUpdate.setName(product.getName());
            toUpdate.setDescription(product.getDescription());
            //update type
            String upperCaseType=product.getProductType().substring(0, 1).toUpperCase() +
                    product.getProductType().substring(1).toLowerCase();
            Type type= typeService.getType(upperCaseType);
            if(type != null) toUpdate.setTypes(new HashSet<>(Set.of(type) ) );
            else {
                toUpdate.setTypes(new HashSet<>(Set.of(new Type(upperCaseType) ) ) );
            }
            //search sector in the database and add it to the element to be updated
            Sector sector= sectorService.getSector(product.getSector());
            if(sector!=null) toUpdate.setSectors(new HashSet<>(Set.of(sector)));
            //remove association with product_categories table before inserting new data
            if(!toUpdate.getProductCategories().isEmpty()){
                List<ProductCategory> toRemove = new ArrayList<>(toUpdate.getProductCategories());
                toRemove.forEach(toUpdate::removeCategory);
            }
            //add incoming categories to the product to be updated
            List<CategoryDetails>categories=new ArrayList<>();
            product.getCategories().forEach(item -> {
                Category category = categoryService.getCategory(item.getName());
                if(category != null ){
                    toUpdate.addCategory(ProductCategory.add(toUpdate, category));//map to the database
                    categories.add(new CategoryDetails(category));// map to the DTO
                }
            });
            return new ProductDetails(productRepository.save(toUpdate),categories);
        }catch (Exception e){
            log.error("update product service: "+e.getMessage());
            throw new ProductException(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    public String deleteProduct(Integer id){
        return productRepository.findById(id)
                .map(product -> {
                    if(!product.getProductCategories().isEmpty()) {
                        List<ProductCategory> toRemove = new ArrayList<>(product.getProductCategories());
                        for (ProductCategory productCategory : toRemove) {
                            product.removeCategory(productCategory);
                        }
                    }
                    if(!product.getImages().isEmpty()){
                        List<Image> toRemove = new ArrayList<>(product.getImages());
                        List<String> publicIds = new ArrayList<>();
                        toRemove.forEach(image -> publicIds.add(image.getPublicId()));
                        imageService.deleteImage(publicIds);
                        for (Image productImage : toRemove) {
                            product.removeImage(productImage);
                        }
                    }
                    productRepository.delete(product);
                    return "Product deleted successfully";
                }).orElseGet(()-> {
                    log.error("\u001B[35mProduct to delete doesn't exists\u001B[0m");
                    throw new ProductException("Product to delete doesn't exists", HttpStatus.NOT_FOUND);
                });
    }

    public Long getTotalProductsBySector(String sector){
        if(productRepository.getTotalBySector(sector).isPresent()){
            return productRepository.getTotalBySector(sector).get();
        }else throw new ProductException("could not fetch amount by sector",HttpStatus.BAD_REQUEST);
    }
}