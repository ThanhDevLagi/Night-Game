import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-info',
  templateUrl: './user_info.component.html',
  styleUrls: ['./user_info.component.css']
})
export class User_infoComponent implements OnInit {
  currentUser: any;
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = './assets/images/default.jpg';
  private api:string = "http://localhost:5000"
  constructor(private authService: AuthService, private http: HttpClient) {
   }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.imageUrl = `./assets/images/${this.currentUser.img}`;
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => this.imageUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      console.log(formData.get('file'));
      this.http.post(`${this.api}/api/upload`, formData).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully:', response);
          this.updateUserProfile(response.filePath);
        },
        error => {
          console.error('Image upload failed:', error);
        }
      );
    }
  }

  updateUserProfile(imagePath: string): void {
    const updatedUser = { ...this.currentUser, img: imagePath };

    this.http.put(`${this.api}/api/users/${this.currentUser.id}`, updatedUser).subscribe(
      (response: any) => {
        console.log('User profile updated successfully:', response);
        this.currentUser = response;
        this.imageUrl = `./assets/images/${this.currentUser.img}`;
      },
      error => {
        console.error('Failed to update user profile:', error);
      }
    );
  }
}
