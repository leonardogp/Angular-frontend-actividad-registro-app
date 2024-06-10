import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private activityService: ActivityService) {}

  onLogin() {
    this.activityService.login(this.username, this.password).subscribe(
      response => {
        if (response.success) {
          localStorage.setItem('currentUser', JSON.stringify({ username: this.username, activities: response.user.activities }));
          this.router.navigate(['/actividades']);
        } else {
          alert(response.message);
        }
      },
      error => {
        alert('Login failed');
      }
    );
  }
}