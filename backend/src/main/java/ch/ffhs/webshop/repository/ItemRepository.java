package ch.ffhs.webshop.repository;

import ch.ffhs.webshop.domain.Customer;
import ch.ffhs.webshop.domain.Item;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends CrudRepository<Item, Long> {

    List<Item> findAllBySeller(Customer customer);

    @Query(value = "SELECT * FROM item WHERE buyer_id IS NULL",
            nativeQuery = true)
    List<Item> findAllWhereBuyerIsNull();
}
