package com.industech.service.product;

import com.cloudinary.Cloudinary;
import com.industech.dto.product.ImageDetails;
import com.industech.exception.ProductException;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class ImageService {
    @Resource
    private Cloudinary cloudinary;

    public ImageDetails uploadFile(MultipartFile file, String folderName) {
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
}
