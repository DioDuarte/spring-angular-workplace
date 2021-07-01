import { PagePath } from './../app-routing.module';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup = this.formBuilder.group({
    email: "",
    password: "",
  });

  constructor(
    private formBuilder: FormBuilder,
    private httpRequest: HttpClient,
    private router: Router,
    private toastr: ToastrService,



  ) { }

  ngOnInit(): void {

    this.verifyAuthToken()

  }


  onSubmit(event: any) {
    event.preventDefault();
    console.log(this.loginForm.getRawValue())
    this.httpRequest.post("http://localhost:8080/users/do-login", this.loginForm.getRawValue(), { responseType: 'text', observe: 'response' }).subscribe(response => {
      window.localStorage.setItem("token", response.body + "")
      this.toastr.success("Você está logado")
      this.router.navigate([PagePath.HOME])

    }, e => {
      console.log("e", e)
      this.toastr.error("Credenciais Invalidas")
    })
  }

  goSignUp() {
    this.router.navigate([PagePath.SIGNUP])
  }

  public verifyAuthToken() {
    if (window.localStorage.getItem("token")) {
      this.toastr.success("Seja bem vindo ao ambiente.", "Login Realizado")
      this.router.navigate([PagePath.HOME])
    }
  }
}
