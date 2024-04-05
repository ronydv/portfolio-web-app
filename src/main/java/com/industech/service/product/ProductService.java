package com.industech.service.product;

import com.industech.dto.product.CategoryDetails;
import com.industech.dto.product.ImageDetails;
import com.industech.dto.product.PaginatedProducts;
import com.industech.dto.product.ProductDetails;
import com.industech.exception.ProductException;
import com.industech.model.product.Category;
import com.industech.model.product.Image;
import com.industech.model.product.Product;
import com.industech.model.product.ProductCategory;
import com.industech.repository.product.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ImageService imageService;

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
                            product.addImage(new ImageDetails(image.getUrl(), image.getName()));
                        }
                        return product;
                    })
                    .collect(Collectors.toList());
        }
    }

    public PaginatedProducts getProductsByPage(Integer page, Integer pageSize){
        if (productRepository.findAll().isEmpty()) {
            log.error("No products found -> getAllProducts()");
            throw new ProductException("No products found", HttpStatus.NOT_FOUND);
        } else {
            PageRequest pageRequest=PageRequest.of((page-1),pageSize);
            Page<Product> productsByPage=productRepository.findAll(pageRequest);
            int total= (int) productsByPage.getTotalElements();
            List<ProductDetails> products=productsByPage.getContent()
                    .stream()
                    .map(found -> {
                        ProductDetails product = new ProductDetails(found);
                        found.getProductCategories().forEach(item -> {
                            product.addCategory(new CategoryDetails(item.getCategory()));
                        });
                        for (Image image : found.getImages()) {
                            product.addImage(new ImageDetails(image.getUrl(), image.getName()));
                        }
                        return product;
                    }).collect(Collectors.toList());
            return new PaginatedProducts(products,total);
        }
    }
/*    public List<Blog> getBlogs(Integer page){
        if(blogRepository.findAll().isEmpty()) throw new RuntimeException("empty list of blogs");
        else{
            PageRequest pageRequest=PageRequest.of((page-1),4);
            Page<Blog> pages =blogRepository.findAll(pageRequest);
            return pages.getContent();
        }
    }*/

    public ProductDetails getProduct(Integer id) {
        return productRepository.findById(id)
                .map(found -> {
                    ProductDetails product = new ProductDetails(found);
                    found.getProductCategories().forEach(item -> {
                        product.addCategory(new CategoryDetails(item.getCategory()));
                    });
                    for (Image image : found.getImages()) {
                        product.addImage(new ImageDetails(image.getUrl(), image.getName()));
                    }
                    return product;
                }).orElseGet(() -> {
                    log.error("\u001B[35mproduct not found\u001B[0m");
                    throw new ProductException("Product not found", HttpStatus.NOT_FOUND);
                });
    }

    public ProductDetails saveProduct(ProductDetails productDetails, List<MultipartFile> files) {
        try {
            Product product = new Product(productDetails.getBrand(),productDetails.getName(),
                                            productDetails.getPrice(), productDetails.getQuantity(),
                                            productDetails.getDescription());
            //add images
            List<ImageDetails> images = new ArrayList<>();
            if(product.getBrand() != null && product.getPrice() != null){
                for(MultipartFile file:files){
                    Image image=new Image(imageService.uploadFile(file,"products"),
                            file.getOriginalFilename());//add image to the cdn server
                    product.addImage(image);//after getting the links from the images, add it to the product entity
                    images.add(new ImageDetails(image.getUrl(),image.getName()));//mapping image to its DTO class
                }
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
        } catch (Exception e) {//throw exception if a repeated product with same brand already exists
            log.error(e.getMessage());
            throw e.getLocalizedMessage().contains("null or transient value") ?
                    new ProductException("Empty body, " + e.getMessage(), HttpStatus.BAD_REQUEST) :
                    new ProductException("Error while saving product", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ProductDetails updateProduct(ProductDetails product){
        try{
            Product toUpdate=productRepository.getReferenceById(product.getId());
            toUpdate.setBrand(product.getBrand());
            toUpdate.setName(product.getName());
            toUpdate.setPrice(product.getPrice());
            toUpdate.setQuantity(product.getQuantity());
            toUpdate.setDescription(product.getDescription());
            List<CategoryDetails>categories=new ArrayList<>();

            //remove association with product_categories table before inserting new data
            if(!toUpdate.getProductCategories().isEmpty()){
                List<ProductCategory> toRemove = new ArrayList<>(toUpdate.getProductCategories());
                toRemove.forEach(toUpdate::removeCategory);
            }
            //add incoming categories to the product to be updated
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
                    List<ProductCategory> toRemove = new ArrayList<>(product.getProductCategories());
                    for (ProductCategory productCategory : toRemove) {
                        product.removeCategory(productCategory);
                    }
                    productRepository.delete(product);
                    return "Product deleted successfully";
                }).orElseGet(()-> {
                    log.error("\u001B[35mProduct to delete doesn't exists\u001B[0m");
                    throw new ProductException("Product to delete doesn't exists", HttpStatus.NOT_FOUND);
                });
    }
}