package com.electric_shop.backend.repository;

import com.electric_shop.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductIdOrderByCreatedAtDesc(Long productId);
    
    boolean existsByUserIdAndOrderId(Long userId, Long orderId);
}
