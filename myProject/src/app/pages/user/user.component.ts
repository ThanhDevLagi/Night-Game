import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser:any;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

}
