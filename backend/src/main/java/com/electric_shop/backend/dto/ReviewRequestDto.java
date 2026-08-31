package com.electric_shop.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data 
public class ReviewRequestDto {
    @NotNull(message = "ID not null")
    private Long productId;

    @NotNull(message = "Please provide a rating")
    @Min(value = 1, message = "Minimum rating is 1 star")
    @Max(value = 5, message = "Maximum rating is 5 stars")
    private Integer rating;

    @NotBlank(message = "Review content cannot be empty")
    private String comment;
}
