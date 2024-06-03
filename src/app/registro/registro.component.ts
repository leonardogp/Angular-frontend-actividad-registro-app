import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onRegister() {
    if (localStorage.getItem(this.username)) {
      alert('Usuario ya existe');
    } else {
      const user = { password: this.password, activities: [] };
      localStorage.setItem(this.username, JSON.stringify(user));
      alert('Registro exitoso');
      this.router.navigate(['/login']);
    }
  }
}