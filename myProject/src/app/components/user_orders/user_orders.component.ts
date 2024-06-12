import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-user_orders',
  templateUrl: './user_orders.component.html',
  styleUrls: ['./user_orders.component.css']
})
export class User_ordersComponent implements OnInit {
  currentUser: any;
  userOrders: any[] = [];
  private api: string = "http://localhost:5000";

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.fetchUserOrders();
      }
    });
  }

  fetchUserOrders() {
    const status = 'waiting';
    this.http.get<any[]>(`${this.api}/api/orders/waiting`, {
      params: {
        user_id: this.currentUser.id,
        status: status
      }
    }).subscribe(
      (data) => {
        this.userOrders = data;
      },
      (error) => {
        console.error('Failed to fetch orders:', error);
      }
    );
  }
}
