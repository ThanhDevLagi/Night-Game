
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginF: FormGroup = new FormGroup({});
  isActive: boolean = true;
  closeEyes: boolean = false;
  openEyes: boolean = true;
  showErrorPopup:boolean = false;
  showSuccessPopup:boolean = false;
  textMessage:string = ''
  errorMessage: string = '';
  textSuccsessMessage:string = '';
  successMessage:string = '';
  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit() {
   this.LoginF = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',Validators.required),
    });
  }
  setActive(){
    this.isActive = !this.isActive
    this.closeEyes = !this.closeEyes
    this.openEyes = !this.openEyes
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    passwordInput.type = this.isActive ? 'password' : 'text';
  }
  onSubmit(): void {
    if (this.LoginF.valid) {
      const { email, password } = this.LoginF.value;
      this.authService.getUserByEmail(email).subscribe(users => {
        if (users.length > 0) {
          const user = users[0];
          if (user.password === password) {
            this.showSuccessPopup = true;
            this.textSuccsessMessage = 'Đăng nhập thành công!';
            this.authService.saveUser(user);
            setTimeout(() => {
              this.showSuccessPopup = false;
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              });
            }, 1000);
          } else {
            this.showErrorPopup = true;
            this.textMessage = "Mật khẩu không đúng!";
            this.errorMessage = 'Xin mời bạn hãy thử lại';
            setTimeout(() => {
              this.showErrorPopup = false;
            }, 2000);
          }
        } else {
          this.showErrorPopup = true;
          this.textMessage = "Email không tồn tại!";
          this.errorMessage = 'Xin bạn hãy tạo tài khoản';
          setTimeout(() => {
            this.showErrorPopup = false;
          }, 2000);
        }
      }, error => {
        console.error('Error logging in:', error);
        this.showErrorPopup = true;
        this.errorMessage = 'Có lỗi xảy ra khi đăng nhập!';
        setTimeout(() => {
          this.showErrorPopup = false;
        }, 2000);
      });
    }
  }
}
