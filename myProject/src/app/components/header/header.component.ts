import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
  }
  logout(): void {
    console.log("click");
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
