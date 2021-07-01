import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PagePath } from './../app-routing.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-cliente-page',
  templateUrl: './cadastro-cliente-page.component.html',
  styleUrls: ['./cadastro-cliente-page.component.scss']
})
export class CadastroClientePageComponent implements OnInit {

  public clienteInfo: any = "";
  public telefoneLista: any = [];
  public enderecoLista: any = [];
  public cnpjHttpError = "";
  public telefoneHttpError = "";
  public enderecoHttpError = "";


  public cadastroClienteForm: FormGroup = this.formBuilder.group({
    email: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/), Validators.minLength(5)]),
    nome: new FormControl("", [Validators.required]),
    cpfcnpj: new FormControl("", [Validators.required, Validators.pattern(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/)]),
    createdby: window.localStorage.getItem("userId")
  })

  public cadastroTelefoneForm: FormGroup = this.formBuilder.group({
    telefone: new FormControl("", [Validators.required, Validators.minLength(8)]),

  })

  public cadastroEnderecoForm: FormGroup = this.formBuilder.group({
    rua: new FormControl("", [Validators.required]),
    numero: new FormControl("", [Validators.required]),
    referencia: new FormControl("", [Validators.required]),
    bairro: new FormControl("", [Validators.required]),
    cidade: new FormControl("", [Validators.required]),
    estado: new FormControl("", [Validators.required]),
    cep: new FormControl("", [Validators.required]),
    principal: new FormControl(false)

  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private httpRequest: HttpClient
  ) { }

  ngOnInit(): void {

    this.verifyAuthToken()
  }

  get validatorControlCliente() {

    return this.cadastroClienteForm.controls
  }

  get validatorControlTelefone() {

    return this.cadastroTelefoneForm.controls
  }

  get validatorControlEndereco() {

    return this.cadastroEnderecoForm.controls
  }



  public verifyAuthToken() {
    if (!window.localStorage.getItem("token")) {
      this.toastr.error("Faça Login para continuar", "Acesso Negado")
      this.router.navigate([PagePath.LOGIN])
    }
  }

  onSubmit() {
    this.verifyAuthToken()
    this.httpRequest.post("http://localhost:8080/clientes/cadastro", this.cadastroClienteForm.getRawValue()).subscribe(response => {
      console.log(response)
      this.clienteInfo = response;
      this.cadastroClienteForm.disable();

      //sucesso

    }, e => {
      console.log(e)
      let error = "Não foi possível processsar essa requisição";
      try {
        error = e.error || error;
      } catch (exception) {
        console.log(exception);
      }
      this.cnpjHttpError = error;
      console.log(this.cnpjHttpError)
    })

    //falhou
  }

  newPhone() {
    this.verifyAuthToken()
    this.httpRequest.post("http://localhost:8080/telefones/cadastro", { ...this.cadastroTelefoneForm.getRawValue(), clienteid: this.clienteInfo.id }).subscribe(response => {
      console.log(response)
      this.telefoneLista.push(response);
      this.cadastroTelefoneForm.reset();

      //sucesso

    }, e => {
      console.log(e)
      let error = "Não foi possível processsar essa requisição";
      try {
        error = e.error || error;
      } catch (exception) {
        console.log(exception);
      }
      this.telefoneHttpError = error;
      console.log(this.telefoneHttpError)

      //falhou
    })
  }

  newAdress() {
    this.verifyAuthToken()
    this.httpRequest.post("http://localhost:8080/enderecos/cadastro", { ...this.cadastroEnderecoForm.getRawValue(), clienteid: this.clienteInfo.id }).subscribe((response: any) => {
      console.log(response)
      if (response.principal) {
        this.enderecoLista.find((item: any) => {
          if (item.principal) item.principal = false
        })
      }
      this.enderecoLista.push(response);
      this.cadastroEnderecoForm.reset();

      //sucesso

    }, e => {
      console.log(e)
      let error = "Não foi possível processsar essa requisição";
      try {
        error = e.error || error;
      } catch (exception) {
        console.log(exception);
      }
      this.enderecoHttpError = error;
      console.log(this.enderecoHttpError);

      //falhou
    })
  }

  goHome() {
    this.router.navigate([PagePath.HOME]);
  }

  resetClienteForm() {
    this.cadastroClienteForm.enable();
    this.cadastroClienteForm.reset();
  }

}
