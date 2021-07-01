package br.com.betha.teste.repository;

import br.com.betha.teste.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface clienteRepository extends JpaRepository<Cliente, Long> {

    public Cliente findByCpfcnpj(String cpfcnpj);

    public List<Cliente> findAllByCreatedby (String createdby);


}
