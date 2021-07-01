package br.com.betha.teste.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="credenciais")
public class User {
   
    @Id
    @GeneratedValue(strategy =GenerationType.AUTO)
    private Long id;

    private String nome;
    private String sobrenome;
    private String email;
    private String password;
    private String token;

    @Override
    public String toString(){
        return this.getId()+","+this.getEmail()+this.getNome()+this.getSobrenome();
    }
}
