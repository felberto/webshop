package ch.ffhs.webshop.service;

import ch.ffhs.webshop.domain.Item;
import ch.ffhs.webshop.domain.dto.CreateItemDto;
import ch.ffhs.webshop.domain.dto.DtoEntity;
import ch.ffhs.webshop.domain.dto.EditItemDto;
import ch.ffhs.webshop.domain.dto.ItemDto;
import ch.ffhs.webshop.exception.ItemNotFoundException;
import ch.ffhs.webshop.repository.ItemRepository;
import ch.ffhs.webshop.util.DtoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    public Item findOne(Long id) {
        Optional<Item> item = itemRepository.findById(id);

        if (!item.isPresent())
            throw new ItemNotFoundException("id-" + id);

        return item.get();
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

    public void update(Long id, EditItemDto editItemDto) {
        Item item = findOne(id);
        itemRepository.save(updateItemValues(editItemDto, item));
    }

    private Item updateItemValues(EditItemDto editItemDto, Item originalItem){
        if (!originalItem.getTitle().equals(editItemDto.getTitle())){
            originalItem.setTitle(editItemDto.getTitle());
        }
        else if (!originalItem.getDescription().equals(editItemDto.getDescription())){
            originalItem.setDescription(editItemDto.getDescription());
        }
        else if (!originalItem.getPrice().equals(editItemDto.getPrice())){
            originalItem.setPrice(editItemDto.getPrice());
        }
        return originalItem;
    }
}
