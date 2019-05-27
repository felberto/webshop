package ch.ffhs.webshop.domain.dto;

import lombok.Data;

@Data
public class AddCartDto implements DtoEntity{
    private Long itemId;
    private Long customerId;
}
