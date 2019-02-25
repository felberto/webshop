package ch.ffhs.webshop.domain.dto;

import lombok.Data;

@Data
public class CustomerAuthDto implements DtoEntity {
    private Long id;
    private String email;
}
