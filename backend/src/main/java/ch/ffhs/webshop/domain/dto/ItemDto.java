package ch.ffhs.webshop.domain.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
public class ItemDto implements DtoEntity {

    private String title;
    private String description;
    private BigDecimal price;
    private String foto;
    private CustomerAuthDto seller;
    private CustomerAuthDto buyer;
    private Timestamp sold;
}
