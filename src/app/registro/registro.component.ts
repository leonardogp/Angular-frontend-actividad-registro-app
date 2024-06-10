import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private activityService: ActivityService) {}

  onRegister() {
    this.activityService.register(this.username, this.password).subscribe(
      response => {
        if (response.success) {
          alert('Registration successful. Please login.');
          this.router.navigate(['/login']);
        } else {
          alert(response.message);
        }
      },
      error => {
        alert('Registration failed');
      }
    );
  }
}