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
@Table(name="clientes_telefones")

public class Telefone {
    @Id
    @GeneratedValue(strategy =GenerationType.AUTO)
    private Long id;

    private String telefone;
    private String clienteid;

}
