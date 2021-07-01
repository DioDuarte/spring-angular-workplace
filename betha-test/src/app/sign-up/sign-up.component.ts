import { PagePath } from './../app-routing.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public httpError = "";

  public signUpForm: FormGroup = this.formBuilder.group({
    email: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/), Validators.minLength(5)]),
    nome: new FormControl("", [Validators.required]),
    sobrenome: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    passwordconfirmation: new FormControl("", [Validators.required]),
  }, {
    validators: this.mustMatch('password', 'passwordconfirmation')

  });
  public submitted: boolean = false
  public buttonSubmit: any = document.getElementById("register-button");

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {


  }

  get validatorControl() {

    return this.signUpForm.controls
  }



  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true })
      } else {
        matchingControl.setErrors(null)
      }
    }

  }

  onSubmit(event: any) {
    event.preventDefault();
    this.http.post("http://localhost:8080/users/register", this.signUpForm.getRawValue()).subscribe(response => {
      console.log("response", response)
      this.router.navigate([PagePath.LOGIN])
      this.toastr.success("Conta Criada!", "Sua conta foi criada com sucesso!")

    }, e => {
      let error = "Não foi possível processsar essa requisição";
      try {
        error = e.error || error;
      } catch (exception) {
        console.log(exception);
      }
      this.httpError = error;
      console.log(this.httpError)
    })

    console.log(this.signUpForm.getRawValue())
  }

}
