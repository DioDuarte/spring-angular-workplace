package br.com.betha.teste.controllers;

//import repositories

import br.com.betha.teste.repository.userRepository;
import br.com.betha.teste.repository.clienteRepository;
import br.com.betha.teste.repository.telefoneRepository;
import br.com.betha.teste.repository.enderecoRepository;

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
@RequestMapping("/enderecos")
public class EnderecoController {

    @Autowired
    private enderecoRepository enderecoRepository;

    @GetMapping("/")
    public String helloClientes() {
        return "você fez um request para o Endereço Controller";
    }

    @PostMapping("/cadastro")
    public ResponseEntity cadastraNewEndereco(@RequestBody Endereco enderecoRequest) {

        Endereco foundEndereco = enderecoRepository.findByRuaAndNumeroAndBairroAndCidadeAndEstadoAndCepAndClienteid(
                enderecoRequest.getRua(), enderecoRequest.getNumero(), enderecoRequest.getBairro(),
                enderecoRequest.getCidade(), enderecoRequest.getEstado(), enderecoRequest.getCep(), enderecoRequest.getClienteid());

        if (Objects.nonNull(foundEndereco)) {
            return new ResponseEntity("Este endereço já foi atribuído para este usuário", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            if (enderecoRequest.getPrincipal()) {
                Endereco principalEndereco = this.enderecoRepository.findByPrincipalAndClienteid(true, enderecoRequest.getClienteid());
                if (Objects.nonNull(principalEndereco)) {
                    principalEndereco.setPrincipal(false);
                    this.enderecoRepository.save(principalEndereco);
                }
            }
            this.enderecoRepository.save(enderecoRequest);
            return new ResponseEntity(enderecoRequest, new HttpHeaders(), HttpStatus.OK);
        }


    }

}


