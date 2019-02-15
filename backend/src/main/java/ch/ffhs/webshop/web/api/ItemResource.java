package ch.ffhs.webshop.web.api;

import ch.ffhs.webshop.domain.Item;
import ch.ffhs.webshop.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
