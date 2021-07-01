import { CadastroClientePageComponent } from './cadastro-cliente-page/cadastro-cliente-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ComponentRef, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export enum PagePath {
  LOGIN = "login",
  HOME = "home",
  SIGNUP = "cadastro",
  CADASTRO_CLIENTE = "cadastro/cliente"
}

const routes: Routes = [
  {
    path: PagePath.LOGIN,
    component: LoginPageComponent
  },
  {
    path: "",
    redirectTo: PagePath.LOGIN,
    pathMatch: "full"
  },
  {
    path: PagePath.HOME,
    component: HomePageComponent
  },
  {
    path: PagePath.SIGNUP,
    component: SignUpComponent
  },
  {
    path: PagePath.CADASTRO_CLIENTE,
    component: CadastroClientePageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

