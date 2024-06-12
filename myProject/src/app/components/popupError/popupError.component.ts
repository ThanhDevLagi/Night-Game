import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-popupError',
  templateUrl: './popupError.component.html',
  styleUrls: ['./popupError.component.css']
})
export class PopupErrorComponent implements OnChanges {
  @Input() textMessage: string;
  @Input() errorMessage: string;
  @Input() showPopup: boolean = false;
  constructor() {
    this.textMessage = '';
    this.errorMessage = '';
   }

   ngOnChanges(changes: SimpleChanges) {
    if (changes['showPopup'] && changes['showPopup'].currentValue) {
      setTimeout(() => {
        this.showPopup = false;
      }, 3000);
    }
  }
}
