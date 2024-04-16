package com.industech.service.product;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import com.industech.dto.product.ImageDetails;
import com.industech.exception.ProductException;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class ImageService {
    @Resource
    private Cloudinary cloudinary;

    public ImageDetails uploadImage(MultipartFile file, String folderName) {
        try {
            HashMap<Object, Object> options = new HashMap<>();
            options.put("folder", folderName);
            Map<?,?> uploadedFile = cloudinary.uploader().upload(file.getBytes(), options);
            String publicId = (String) uploadedFile.get("public_id");
            String url=cloudinary.url().secure(true).generate(publicId);
            return new ImageDetails(url,publicId);
        } catch (IOException e) {
            throw new ProductException(e.getMessage());
        }
    }

    public void deleteImage(List<String> publicIds){
        try {
            ApiResponse apiResponse = cloudinary.api().deleteResources(publicIds,
                    ObjectUtils.asMap("type", "upload", "resource_type", "image"));
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ProductException(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
