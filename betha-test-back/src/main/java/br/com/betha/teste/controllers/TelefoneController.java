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
@RequestMapping("/telefones")
public class TelefoneController {

    @Autowired
    private telefoneRepository telefoneRepository;

    @GetMapping("/")
    public String helloClientes(){
        return "você fez um request para o Telefone Controller";
    }

    @PostMapping("/cadastro")
    @CrossOrigin(origins = "http://localhost:4200/")
    public ResponseEntity cadasatraNewTelefone(@RequestBody Telefone telefoneRequest) {
        Telefone foundTelefone = telefoneRepository.findByTelefoneAndClienteid(telefoneRequest.getTelefone(), telefoneRequest.getClienteid());


        if (Objects.nonNull(foundTelefone)){
            return new ResponseEntity("Este cliente já possui este número no cadastro", new HttpHeaders(),
                    HttpStatus.BAD_REQUEST);
        }
        else {
            this.telefoneRepository.save(telefoneRequest);
            return new ResponseEntity(telefoneRequest, new HttpHeaders(),
                    HttpStatus.OK);
        }

    }



}
