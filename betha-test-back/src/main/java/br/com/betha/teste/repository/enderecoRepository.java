package br.com.betha.teste.repository;

import br.com.betha.teste.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface enderecoRepository extends JpaRepository<Endereco, Long> {

    Endereco findByRuaAndNumeroAndBairroAndCidadeAndEstadoAndCepAndClienteid(String rua, String numero, String bairro, String cidade, String estado, String cep, String clienteid);

    Endereco findByPrincipalAndClienteid(Boolean principal, String clientid);

}
