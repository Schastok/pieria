import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false,
})
export class SignupPage implements OnInit {
  errors = [];
  errorkeys = [];
  errorobj;
  pw_error;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {}

  signup() {
    this.errors = [];
    this.errorkeys = [];
    this.pw_error = '';
    let password1 = (document.getElementById('password1') as HTMLInputElement)
      .value;
    let password2 = (document.getElementById('password2') as HTMLInputElement)
      .value;
    if (password1 === password2) {
      let email = (document.getElementById('email') as HTMLInputElement).value;
      this.apiService.register(password1, email).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('This is the error', error);
          this.errorobj = error;
          console.log(this.errorobj);
          for (let i = 0; i < Object.keys(error).length; i++) {
            let e = Object.keys(error)[i];
            if (e != 'client') {
              this.errors.push(error[e]);
              this.errorkeys.push(e);
            }
          }
          console.log(this.errorkeys);
        }
      );
    } else {
      this.pw_error = 'passwords are not identical';
      return;
    }
  }
}
