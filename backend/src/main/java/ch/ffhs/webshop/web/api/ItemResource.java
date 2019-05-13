package ch.ffhs.webshop.web.api;

import ch.ffhs.webshop.domain.Item;
import ch.ffhs.webshop.domain.dto.AddCartDto;
import ch.ffhs.webshop.domain.dto.CreateItemDto;
import ch.ffhs.webshop.domain.dto.DtoEntity;
import ch.ffhs.webshop.domain.dto.EditItemDto;
import ch.ffhs.webshop.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
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

    @GetMapping("/item/{id}")
    public DtoEntity findOne(@PathVariable("id") Long id) {
        return itemService.findOne(id);
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

    @PutMapping(value = "/item/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable("id") Long id, @RequestBody EditItemDto editItemDto) {
        itemService.update(id, editItemDto);
    }

    @PutMapping(value = "/item/removed")
    @ResponseStatus(HttpStatus.OK)
    public DtoEntity removeFromCart(@RequestBody CreateItemDto itemDto) {
        return itemService.removeFromCart(itemDto);
    }

    @PutMapping(value = "/item/add")
    @ResponseStatus(HttpStatus.OK)
    public void addToCart(@RequestBody AddCartDto addCartDto) {
        itemService.addToCart(addCartDto);
    }

    @PutMapping(value = "/item/buy/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void buyItems(@PathVariable("id") Long customerId, @RequestBody List<Long> itemIds) {
        itemService.buyItems(customerId, itemIds);
    }
}
