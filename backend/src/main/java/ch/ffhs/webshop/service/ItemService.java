package ch.ffhs.webshop.service;

import ch.ffhs.webshop.domain.Item;
import ch.ffhs.webshop.domain.dto.CreateItemDto;
import ch.ffhs.webshop.domain.dto.DtoEntity;
import ch.ffhs.webshop.domain.dto.ItemDto;
import ch.ffhs.webshop.repository.ItemRepository;
import ch.ffhs.webshop.util.DtoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    private final ItemRepository itemRepository;

    @Autowired
    private final CustomerService customerService;

    public ItemService(ItemRepository itemRepository, CustomerService customerService) {
        this.itemRepository = itemRepository;
        this.customerService = customerService;
    }

    public List<Item> findAll() {
        List<Item> list = new ArrayList<>();
        itemRepository.findAll().forEach(list::add);
        return list;
    }

    public List<DtoEntity> findAllByCustomer(Long id) {
        List<Item> list = itemRepository.findAllBySeller(customerService.findOne(id));
        return list.stream()
                .map(item -> new DtoUtils().convertToDto(item, new ItemDto()))
                .collect(Collectors.toList());
    }

    public DtoEntity save(CreateItemDto itemDto) {
        Item item = (Item) new DtoUtils().convertToEntity(new Item(), itemDto);
        Item returnItem = itemRepository.save(item);
        return new DtoUtils().convertToDto(returnItem, new ItemDto());
    }

    public List<DtoEntity> findAllAvailable() {
        List<Item> list = itemRepository.findAllWhereBuyerIsNull();
        return list.stream()
                .map(item -> new DtoUtils().convertToDto(item, new ItemDto()))
                .collect(Collectors.toList());
    }

    public List<DtoEntity> findAllCartItems(Long id){
        List<Item> list = itemRepository.findAllByCart(id);
        return list.stream()
                .map((item -> new DtoUtils().convertToDto(item, new ItemDto())))
                .collect(Collectors.toList());
    }
}
