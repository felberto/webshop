package ch.ffhs.webshop.domain.dto;

import lombok.Data;

@Data
public class CustomerProfileDto implements DtoEntity {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
}
