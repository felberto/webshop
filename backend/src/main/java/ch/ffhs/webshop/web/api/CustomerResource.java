package ch.ffhs.webshop.web.api;

import ch.ffhs.webshop.domain.Customer;
import ch.ffhs.webshop.domain.dto.CustomerLoginDto;
import ch.ffhs.webshop.domain.dto.CustomerProfileDto;
import ch.ffhs.webshop.domain.dto.DtoEntity;
import ch.ffhs.webshop.service.CustomerService;
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

    @PostMapping(value = "/customer/authenticate")
    public DtoEntity login(@RequestBody CustomerLoginDto customerLoginDto) {
        return customerService.login(customerLoginDto);
    }

    @PostMapping("/customer")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer create(@RequestBody Customer customer) {
        customer.setActive(true);
        return customerService.save(customer);
    }

    @PutMapping(value = "/customer/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable("id") Long id, @RequestBody CustomerProfileDto customerProfileDto) {
        customerService.update(id, customerProfileDto);
    }

    @PutMapping(value = "/customer/deactivated/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deactivateProfile(@PathVariable("id") Long id) {
        customerService.deactivateProfile(id);
    }

    @DeleteMapping(value = "/customer/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
        customerService.deleteById(id);
    }
}
