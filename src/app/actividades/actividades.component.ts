import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Activity {
  description: string;
  time: number;
  timestamp: Date;
  username: string;
}

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  description: string = '';
  time: number = 0;
  activities: Activity[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(localStorage.getItem(currentUser)!);
      this.activities = user.activities || [];
    } else {
      this.router.navigate(['/login']);
    }
  }

  onAddActivity() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(localStorage.getItem(currentUser)!);
      const newActivity: Activity = {
        description: this.description,
        time: this.time,
        timestamp: new Date(),
        username: user.username // Añadimos el nombre de usuario
      };
      user.activities.push(newActivity);
      localStorage.setItem(currentUser, JSON.stringify(user));
      this.activities = user.activities;
      this.description = '';
      this.time = 0;
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }
}