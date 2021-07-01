package br.com.betha.teste.controllers;

import br.com.betha.teste.model.User;
import br.com.betha.teste.repository.userRepository;

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


@RestController
@RequestMapping("/users")
public class UserController {

    // Anotações:

    // GET @GetMapping
    // POST @PostMapping
    // PUT @PutMapping
    // DELETE @DeleteMapping
    // PATCH @PatchMapping

    @Autowired
    private userRepository userRepository;

    @GetMapping("/{id}")
    public User user(@PathVariable("id") Long id) {
        System.out.println("o id é " + id);
        Optional<User> userFind = this.userRepository.findById(id);

        if (userFind.isPresent()) {
            return userFind.get();
        }

        return null;

    }

    @GetMapping("/get-user-data")
    public Object getUserData(@RequestHeader("token") String token) {
        User foundUser = userRepository.findByToken(token);
        if (Objects.nonNull(foundUser)) {
            foundUser.setPassword(null);
            return foundUser;

        } else{

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:4200/")
    public ResponseEntity<String> saveNewUser(@RequestBody User user) {
        if (Objects.isNull(userRepository.findByEmail(user.getEmail()))) {
            user.setPassword(Base64.getEncoder().encodeToString(user.getPassword().getBytes()));
            user.setToken(toBase64(user.toString()));
            this.userRepository.save(user);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return new ResponseEntity<String>("Este email já está cadastrado", new HttpHeaders(),
                    HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome REST Api";
    }

    private String toBase64(String value){
        return Base64.getEncoder().encodeToString(value.getBytes());
    }

    @PostMapping("/do-login")
    @CrossOrigin(origins = "http://localhost:4200/")
    public ResponseEntity<String> doLogin(@RequestBody User userRequest) {
        User user = userRepository.findByEmail(userRequest.getEmail());
        if (Objects.nonNull(user) && (user.getPassword().equals(toBase64(userRequest.getPassword())))){
            HttpHeaders header = new HttpHeaders();
            header.set("credencial", userRequest.getEmail());
            return ResponseEntity.status(HttpStatus.OK).headers(header).body(user.getToken());
        }
        else {
            return new ResponseEntity<>("Credenciais Inválidas", new HttpHeaders(),
                    HttpStatus.UNAUTHORIZED);
        }

    }

    @GetMapping("/lista")
    public List<User> list() {
        return this.userRepository.findAll();
    }

}
