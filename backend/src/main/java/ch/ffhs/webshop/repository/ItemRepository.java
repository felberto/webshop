package ch.ffhs.webshop.repository;

import ch.ffhs.webshop.domain.Item;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface ItemRepository extends CrudRepository<Item, Long> {

}
