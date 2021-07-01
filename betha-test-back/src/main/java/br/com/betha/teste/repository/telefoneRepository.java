package br.com.betha.teste.repository;

import br.com.betha.teste.model.Cliente;
import br.com.betha.teste.model.Telefone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface telefoneRepository extends JpaRepository<Telefone, Long> {

    Telefone findByTelefone(String telefone);

    Telefone findByTelefoneAndClienteid(String telefone, String clientid);

    Telefone findByClienteid(String clienteId);

}
