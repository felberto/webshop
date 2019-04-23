package ch.ffhs.webshop.domain.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class EditItemDto implements DtoEntity {
    private String title;
    private String description;
    private BigDecimal price;
    private String image;
}
