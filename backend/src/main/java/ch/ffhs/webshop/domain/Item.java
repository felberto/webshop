package ch.ffhs.webshop.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String title;
    @NotNull
    private String description;
    @NotNull
    private BigDecimal price;
    private String image;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private Customer seller;
    private Long buyer_id;
    private Timestamp sold;
    @Column(name = "cart_customer_id")
    private Long cart;

    public Item() {
    }

    public Item(String title, String description, BigDecimal price,
                String image, Customer seller, Long buyer_id, Timestamp sold, Long cart) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
        this.seller = seller;
        this.buyer_id = buyer_id;
        this.sold = sold;
        this.cart = cart;
    }
}
