package ch.ffhs.webshop.web.api;

import ch.ffhs.webshop.domain.Customer;
import ch.ffhs.webshop.service.CustomerService;
import jdk.internal.jline.internal.Preconditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CustomerResource {

    @Autowired
    private final CustomerService customerService;

    public CustomerResource(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customer")
    public List<Customer> findAll() {
        return customerService.findAll();
    }

    @GetMapping(value = "/customer/{id}")
    public Customer findOne(@PathVariable("id") Long id) {
        return customerService.findOne(id);
    }

    @PostMapping("/customer")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer create(@RequestBody Customer customer) {
        return customerService.save(customer);
    }

    @PutMapping(value = "/customer/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable("id") Long id, @RequestBody Customer customer) {
        Preconditions.checkNotNull(customer);
        customerService.findOne(customer.getId());
        customerService.update(customer);
    }

    @DeleteMapping(value = "/customer/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
        customerService.deleteById(id);
    }
}
