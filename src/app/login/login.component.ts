import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {User} from "./user";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  username: string
  password: string
  signingUp: boolean
  errors: string[];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  onSubmit() {
    this.authService
      .tryToLogin(this.username, this.password)
      .subscribe(response => {
        const access_token = JSON.stringify(response)
        localStorage.setItem('access_token', access_token)
        this.router.navigate([`/home`])
      }, errorResponse => {
        Swal.fire(
          'FALHA',
          'Usuário e/ou senha incorreto(s).',
          'error'
        )
      })
  }

  signUp(event: any) {
    event.preventDefault()
    this.signingUp = true
    this.username = null
    this.password = null
  }

  cancelSignUp(event: any) {
    event.preventDefault()
    this.signingUp = false
    this.username = null
    this.password = null
  }

  register() {
    const user: User = new User()
    user.username = this.username
    user.password = this.password
    this.authService
      .save(user)
      .subscribe(response => {
        Swal.fire(
          'SUCESSO',
          'Cadastro realizado com sucesso! Efetue o login.',
          'success'
        )
        this.errors = null;
        this.signingUp = false;
        this.username = null;
        this.password = null;
      }, errorResponse => {
        Swal.fire(
          'FALHA',
          'Erro ao tentar realizar o cadastro!',
          'error'
        )
        this.errors = errorResponse.error.errors
        this.username = null;
        this.password = null;
      })
  }
}
