import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '../activity.service';

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

  constructor(private router: Router, private activityService: ActivityService) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (currentUser) {
      this.activityService.getActivities(currentUser.username).subscribe(
        response => {
          if (response.success) {
            this.activities = response.activities;
          }
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  onAddActivity() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (currentUser) {
      this.activityService.addActivity(currentUser.username, this.description, this.time).subscribe(
        response => {
          if (response.success) {
            this.activities.push(response.activity);
            this.description = '';
            this.time = 0;
          }
        }
      );
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }
}