import { PagePath } from './../app-routing.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public listaClientes: any = [];

  menuTrilha = [
    {
      trilha: "Gestão Municipal",
      color: "brown",
    },
    {
      trilha: "Planejamento e Contabilidade",
      color: "purple",
    }, {
      trilha: "Arrecadação e Fiscalização",
      color: "green",
    },
    {
      trilha: "Atendimento",
      color: "gray",
    },
    {
      trilha: "Pessoal e Recursos Humanos",
      color: "blue",
    },
    {
      trilha: "Saúde e Assistência Social",
      color: "green",
    },
    {
      trilha: "Educação e Gestão Escolar",
      color: "darkgoldenrod",
    },
    {
      trilha: "Gestão de Leis Municipais",
      color: "orange",
    },
    {
      trilha: "Gestão de Compras e Contratos",
      color: "red",
    },

  ];

  constructor(
    private httpRequest: HttpClient,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.verifyAuthToken()

    this.getUserData()

    this.getClientData()
  }

  public verifyAuthToken() {
    if (!window.localStorage.getItem("token")) {
      this.toastr.error("Faça Login para continuar", "Acesso Negado")
      this.router.navigate([PagePath.LOGIN])
    }
  }

  public getClientData() {
    let params = { headers: { userId: window.localStorage.getItem("userId") + "" } };
    this.httpRequest.get("http://localhost:8080/clientes/meus-clientes", params).subscribe((response: any) => {
      console.log(response);
      this.listaClientes = response;
    })
  }

  public getUserData() {
    let params = { headers: { token: window.localStorage.getItem("token") + "" } };
    this.httpRequest.get("http://localhost:8080/users/get-user-data", params).subscribe((response: any) => {

      //sucesso
      window.localStorage.setItem("userId", response.id)
      console.log("o userId é", window.localStorage.getItem("userId"))


    }, e => {
      console.log(e)

      //erro

    })
  }
  public goCadastroCliente() {
    this.router.navigate([PagePath.CADASTRO_CLIENTE])
  }

  logout() {
    window.localStorage.removeItem("token");
    this.toastr.show("Você foi deslogado com sucesso", "Deslogado")
    this.router.navigate([PagePath.LOGIN])
  }

}
