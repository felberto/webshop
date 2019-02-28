package ch.ffhs.webshop.domain.dto;

import lombok.Data;

@Data
public class CustomerLoginDto implements DtoEntity {
    private String email;
    private String password;
}
