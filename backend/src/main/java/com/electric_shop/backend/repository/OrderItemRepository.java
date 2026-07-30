package com.electric_shop.backend.repository;

import org.springframework.stereotype.Repository;
import com.electric_shop.backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {}