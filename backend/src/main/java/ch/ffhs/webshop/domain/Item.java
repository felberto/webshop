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
    private String foto;// to be defined
    @NotNull
    private Long seller_id;
    private Long buyer_id;
    private Timestamp sold;

    public Item(){}

    public Item(String title, String description, BigDecimal price,
                String foto, Long seller_id, Long buyer_id, Timestamp sold){
        this.title = title;
        this.description = description;
        this.price = price;
        this.foto = foto;
        this.seller_id = seller_id;
        this.buyer_id = buyer_id;
        this.sold = sold;
    }
}
