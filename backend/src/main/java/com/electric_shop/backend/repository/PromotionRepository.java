package com.electric_shop.backend.repository;

import org.springframework.stereotype.Repository;
import com.electric_shop.backend.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    Optional<Promotion> findByCodeAndIsActiveTrue(String code);
}
