package com.electric_shop.backend.service;

import com.electric_shop.backend.repository.ProductRepository;
import com.electric_shop.backend.repository.CategoryRepository;
import com.electric_shop.backend.dto.ProductDto;
import com.electric_shop.backend.entity.Product;
import com.electric_shop.backend.entity.Category;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository; 
    private final CategoryRepository categoryRepository; 

    public ProductDto createProduct(ProductDto request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (productRepository.existsBySku(request.getSku())) {
            throw new RuntimeException("Product with the same SKU already exists");
        }

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .sku(request.getSku())
                .stockQuantity(request.getStockQuantity())
                .imageUrl(request.getImageUrl())
                .category(category)
                .build();

        Product savedProduct = productRepository.save(product);
        
        return ProductDto.builder()
                .id(savedProduct.getId())
                .name(savedProduct.getName())
                .description(savedProduct.getDescription())
                .price(savedProduct.getPrice())
                .sku(savedProduct.getSku())
                .stockQuantity(savedProduct.getStockQuantity())
                .imageUrl(savedProduct.getImageUrl())
                .categoryId(savedProduct.getCategory().getId())
                .build();
    }

    public List<ProductDto> getProducts(Long categoryId) {
        List<Product> products;
        if(categoryId != null) {
            products = productRepository.findByCategoryId(categoryId);
        } else {
            products = productRepository.findAll();
        }
        return products.stream()
            .map(product -> ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .sku(product.getSku())
                .stockQuantity(product.getStockQuantity())
                .imageUrl(product.getImageUrl())
                .description(product.getDescription())
                .categoryId(product.getCategory().getId())
                .build()).collect(Collectors.toList());
    }

    public ProductDto getProductById (Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .sku(product.getSku())
                .stockQuantity(product.getStockQuantity())
                .imageUrl(product.getImageUrl())
                .description(product.getDescription())
                .categoryId(product.getCategory().getId())
                .build();
    }

    public ProductDto updateProduct (Long id, ProductDto request) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        if(!product.getSku().equals(request.getSku()) && productRepository.existsBySku(request.getSku())) {
            throw new RuntimeException("Error SKU");
        }

        Category category = product.getCategory();
        if (!product.getCategory().getId().equals(request.getCategoryId())) {
            category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found"));
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setSku(request.getSku());
        product.setStockQuantity(request.getStockQuantity());
        product.setImageUrl(request.getImageUrl());
        product.setCategory(category);

        Product updatedProduct = productRepository.save(product);

        return ProductDto.builder()
                .id(updatedProduct.getId())
                .name(updatedProduct.getName())
                .description(updatedProduct.getDescription())
                .price(updatedProduct.getPrice())
                .sku(updatedProduct.getSku())
                .stockQuantity(updatedProduct.getStockQuantity())
                .imageUrl(updatedProduct.getImageUrl())
                .categoryId(updatedProduct.getCategory().getId())
                .build();
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        productRepository.delete(product);
    }
}