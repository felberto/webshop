package ch.ffhs.webshop.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * @author Tobias Felber
 * @author Melanie Ockenfels
 */
@Entity
@Data
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String email;
    @NotNull
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    private String password;
    private boolean active;

    public Customer() {
    }

    /**
     * Default constructor for customer
     *
     * @param email
     * @param firstName
     * @param lastName
     * @param password
     */
    public Customer(String email, String firstName, String lastName, String password) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }
}
