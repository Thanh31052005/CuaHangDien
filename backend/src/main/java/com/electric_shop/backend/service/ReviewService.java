package com.electric_shop.backend.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.electric_shop.backend.entity.User;
import com.electric_shop.backend.entity.Product;
import com.electric_shop.backend.entity.Review;
import com.electric_shop.backend.enums.OrderStatus;
import com.electric_shop.backend.repository.OrderRepository;
import com.electric_shop.backend.repository.ProductRepository;
import com.electric_shop.backend.repository.ReviewRepository;
import com.electric_shop.backend.repository.UserRepository;
import com.electric_shop.backend.dto.ReviewRequestDto;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public String addReview(String username, ReviewRequestDto request) {
        boolean hasBought = orderRepository.existsByUser_UsernameAndOrderItems_Product_IdAndStatus(
                username, 
                request.getProductId(), 
                OrderStatus.DELIVERED
        );

        if (!hasBought) {
            throw new RuntimeException("You must have purchased the product to leave a review.");
        }

        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));

        // Kiểm tra xem đã đánh giá chưa - Nếu cấm spam
        
        Review review = Review.builder()
                .user(user)
                .product(product)
                .rating(request.getRating()) // 1 đến 5 sao
                .comment(request.getComment())
                .build();
                
        reviewRepository.save(review);
        
        //  Mở rộng Cập nhật lại điểm đánh giá trung bình (averageRating) của Product
        
        return "Review added successfully.";
    }
}
