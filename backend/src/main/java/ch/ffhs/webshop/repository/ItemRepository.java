package ch.ffhs.webshop.repository;

import ch.ffhs.webshop.domain.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Long> {

}
