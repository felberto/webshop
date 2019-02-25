package ch.ffhs.webshop.web.api;

import ch.ffhs.webshop.domain.Item;
import ch.ffhs.webshop.domain.dto.CustomerAuthDto;
import ch.ffhs.webshop.domain.dto.DtoEntity;
import ch.ffhs.webshop.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ItemResource {

    @Autowired
    private final ItemService itemService;

    public ItemResource(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/item")
    public List<Item> findAll() {
        return itemService.findAll();
    }

    @GetMapping(value = "/item/customer/{id}")
    public List<DtoEntity> findAllByCustomer(@PathVariable("id") Long id) {
        return itemService.findAllByCustomer(id);
    }

    @PostMapping("/item")
    @ResponseStatus(HttpStatus.CREATED)
    public Item create(@RequestBody Item item) {
        return itemService.save(item);
    }

}
