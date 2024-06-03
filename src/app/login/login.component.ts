import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    const storedUser = localStorage.getItem(this.username);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === this.password) {
        localStorage.setItem('currentUser', this.username);
        this.router.navigate(['/actividades']);
      } else {
        alert('Contraseña incorrecta');
      }
    } else {
      alert('Usuario no encontrado');
    }
  }
}