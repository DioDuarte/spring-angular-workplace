package br.com.betha.teste.controllers;

//import repositories

import br.com.betha.teste.repository.userRepository;
import br.com.betha.teste.repository.clienteRepository;
import br.com.betha.teste.repository.enderecoRepository;
import br.com.betha.teste.repository.telefoneRepository;

//import models
import br.com.betha.teste.model.User;
import br.com.betha.teste.model.Cliente;
import br.com.betha.teste.model.Endereco;
import br.com.betha.teste.model.Telefone;


import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

//import org.apache.coyote.Response;
import org.apache.coyote.Response;
import org.hibernate.mapping.Any;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private clienteRepository clienteRepository;

    @GetMapping("/")
    public String helloClientes(){
        return "você fez um request para o Cliente Controller";
    }

    @PostMapping("/cadastro")
    public ResponseEntity saveNewCliente(@RequestBody Cliente cliente){
        if(Objects.isNull(this.clienteRepository.findByCpfcnpj(cliente.getCpfcnpj()))) {
            this.clienteRepository.save(cliente);
            System.out.println(cliente.getId());
            return new ResponseEntity(cliente, new HttpHeaders(), HttpStatus.OK);
        } else{
            return new ResponseEntity("Este CNPJ já está em uso", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }

        }
        @GetMapping("/meus-clientes")
    public ResponseEntity getMeusClientes(@RequestHeader ("userId") String meusClientes){
        return new ResponseEntity(this.clienteRepository.findAllByCreatedby(meusClientes), new HttpHeaders(), HttpStatus.OK);

        }

    }
