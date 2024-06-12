import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { numericValidator } from 'src/app/Validator/validatorNumber';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterF: FormGroup = new FormGroup({})
  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;
  textMessage: string = ''
  errorMessage: string = ''
  textSuccsessMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.RegisterF = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), numericValidator()]),
    })
  }

  onSubmit() {
    if (this.RegisterF.valid) {
      const email = this.RegisterF.get('email')!.value;
      console.log(email);
      this.authService.CheckEmailExits(email).subscribe(response => {
        if (response && response.length > 0) {
          this.showErrorPopup = true;
          this.textMessage = 'Email đã tồn tại !';
          this.errorMessage = 'Xin mời nhập email khác hoặc đăng nhập';
          setTimeout(() => {
            this.showErrorPopup = false;
          }, 4000);
        } else {
          this.authService.register(this.RegisterF.value).subscribe(response => {
            console.log('User registered successfully:', response);
            this.showSuccessPopup = true;
            this.textSuccsessMessage = 'Đăng ký thành công';
            
            this.successMessage = 'Bạn sẽ chuyển trang qua đăng nhập';
            setTimeout(() => {
              this.showSuccessPopup = false;
              this.router.navigate(['/login']);
            }, 2000);
          }, error => {
            console.error('Error registering user:', error);
          });
        }
      }, error => {
        console.error('Error checking email:', error);
      });
    }
  }
}
