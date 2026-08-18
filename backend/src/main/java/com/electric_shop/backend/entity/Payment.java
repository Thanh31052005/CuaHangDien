package com.electric_shop.backend.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;
import com.electric_shop.backend.enums.PaymentMethod;
import com.electric_shop.backend.enums.PaymentStatus;

@Entity
@Table(name = "payments")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    @Builder.Default
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(name = "transaction_id", length = 100)
    private String transactionId;

    @Column(name = "transaction_date", updatable = false)
    private LocalDateTime transactionDate;
    
    @PrePersist // chỗ này tách ra cho dễ hiểu về logic, có thể dùng Timestamp. Dùng này cho lạ
    protected void onCreate() {
        transactionDate = LocalDateTime.now();
    }
}
