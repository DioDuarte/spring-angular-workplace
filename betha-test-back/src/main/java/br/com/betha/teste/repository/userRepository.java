package br.com.betha.teste.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.betha.teste.model.User;

import java.util.Optional;


public interface userRepository extends JpaRepository<User, Long> {

    public User findByEmail(String email);

    public User findByPassword(String password);

    public User findByToken(String token);

}
