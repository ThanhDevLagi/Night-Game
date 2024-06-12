import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api';
  private orderChangeSubject = new Subject<any>();
  constructor(private http: HttpClient) {}

  addOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, order).pipe(
      tap(newOrder => this.orderChangeSubject.next(newOrder))
    );
  }
  getOrder(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders?user_id=${userId}&status=pending`);
  }
  updateOrder(order: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${order.id}`, order).pipe(
      tap(updatedOrder => this.orderChangeSubject.next(updatedOrder))
    );
  }
  getOrderChanges(): Observable<any> {
    return this.orderChangeSubject.asObservable();
  }

  /**
   *
   * @param userId Chỉnh sữa lại về url sản phẩm pending
   * @returns
   * việc cần làm, lấy product pending hiển thị pending
   */
  getOrderCartPending(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders?user_id=${userId}&status=pending`).pipe(
      map((order: any) => {
        if (order && order.products) {
          return {
            ...order,
            total: order.products.reduce((acc: number, product: any) => acc + (product.price * product.quantity), 0)
          };
        } else {
          return {
            id: null,
            total: 0,
            products: []
          };
        }
      }),
      catchError(error => {
        console.error('Failed to fetch pending order:', error);
        return of({
          id: null,
          total: 0,
          products: []
        });
      })
    );
}


  completeCart(orderId: string, newStatus: string): Observable<any> {
    const endpoint = `${this.apiUrl}/orders/${orderId}/status`;
    const requestBody = { status: newStatus };

    return this.http.patch(endpoint, requestBody).pipe(
      tap(updatedOrder => {
        // Phát ra thông báo cập nhật đơn hàng
        this.orderChangeSubject.next(updatedOrder);
      })
    );
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/orders/${orderId}/status`, { status });
  }
}
