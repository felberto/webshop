package ch.ffhs.webshop.service;

import ch.ffhs.webshop.domain.Customer;
import ch.ffhs.webshop.domain.dto.CustomerAuthDto;
import ch.ffhs.webshop.domain.dto.CustomerLoginDto;
import ch.ffhs.webshop.domain.dto.CustomerProfileDto;
import ch.ffhs.webshop.domain.dto.DtoEntity;
import ch.ffhs.webshop.exception.CustomerNotFoundException;
import ch.ffhs.webshop.repository.CustomerRepository;
import ch.ffhs.webshop.util.DtoUtils;
import ch.ffhs.webshop.util.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private final CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {

        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Customer> findAll() {
        List<Customer> list = new ArrayList<>();
        customerRepository.findAll().forEach(list::add);
        return list;
    }

    public Customer findOne(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);

        if (!customer.isPresent())
            throw new CustomerNotFoundException("id-" + id);

        return customer.get();
    }

    public DtoEntity login(CustomerLoginDto customer) {
        Customer customer1 = customerRepository.findCustomerByEmail(customer.getEmail());
        if (passwordEncoder.passwordEncoder().matches(customer.getPassword(), customer1.getPassword())) {
            return new DtoUtils().convertToDto(customer1, new CustomerAuthDto());
        } else {
            return null;
        }
    }

    public Customer save(Customer customer) {

        customer.setPassword(passwordEncoder.passwordEncoder().encode(customer.getPassword()));
        return customerRepository.save(customer);
    }

    public void update(Long id, CustomerProfileDto customerProfileDto) {
        Customer customer = findOne(id);
        customerRepository.save(updateCustomerValues(customerProfileDto, customer));
    }

    public void deleteById(Long id) {
        customerRepository.delete(findOne(id));
    }

    private Customer updateCustomerValues(CustomerProfileDto profileDtoCustomer, Customer originalCustomer){
        if (!originalCustomer.getFirstName().equals(profileDtoCustomer.getFirstName())){
            originalCustomer.setFirstName(profileDtoCustomer.getFirstName());
        }
        else if (!originalCustomer.getLastName().equals(profileDtoCustomer.getLastName())){
            originalCustomer.setLastName(profileDtoCustomer.getLastName());
        }
        else if (!originalCustomer.getEmail().equals(profileDtoCustomer.getEmail())){
            originalCustomer.setEmail(profileDtoCustomer.getEmail());
        }
        return originalCustomer;
    }
}
