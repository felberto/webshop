package ch.ffhs.webshop.web.api;

import ch.ffhs.webshop.domain.Item;
import ch.ffhs.webshop.domain.dto.CreateItemDto;
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

    @GetMapping(value = "/item/available")
    public List<DtoEntity> findAllAvailable() {
        return itemService.findAllAvailable();
    }

    @GetMapping(value = "/item/cart/customer/{id}")
    public List<DtoEntity> findAllCartItems(@PathVariable("id") Long id){
        return itemService.findAllCartItems(id);
    }

    @PostMapping("/item")
    @ResponseStatus(HttpStatus.CREATED)
    public DtoEntity create(@RequestBody CreateItemDto itemDto) {
        return itemService.save(itemDto);
    }

}
