import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-popupSuccess',
  templateUrl: './popupSuccess.component.html',
  styleUrls: ['./popupSuccess.component.css']
})
export class PopupSuccessComponent implements OnChanges  {
  @Input() textSuccsessMessage: string;
  @Input() successMessage: string;
  @Input() showPopup: boolean = false;
  constructor() {
    this.textSuccsessMessage = 'Đặt hàng thành công';
    this.successMessage = 'Cảm ơn bạn đã đặt hàng';
  }

  ngOnChanges(changes: any) {
    if (changes.showPopup && changes.showPopup.currentValue) {
      setTimeout(() => {
        this.showPopup = false;
      }, 3000);
    }
  }

}
