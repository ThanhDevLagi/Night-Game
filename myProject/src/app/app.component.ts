import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myProject';
  currentUser: any;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  ngOnInit() {
  }

  logout(): void {
    console.log("click");
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });;
  }
}
