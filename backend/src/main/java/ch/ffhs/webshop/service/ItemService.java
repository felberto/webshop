package ch.ffhs.webshop.service;

import ch.ffhs.webshop.domain.Item;
import ch.ffhs.webshop.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {

    @Autowired
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> findAll() {
        List<Item> list = new ArrayList<>();
        itemRepository.findAll().forEach(list::add);
        return list;
    }
}
