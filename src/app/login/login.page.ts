import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  errors = [];
  errorkeys = [];
  errorobj;
  credentials = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    Preferences.get({ key: 'userid' }).then((val) => {
      this.credentials['id'] = val;
    });
    Preferences.get({ key: 'key' }).then((val) => {
      this.credentials['key'] = val;
    });
    Preferences.get({ key: 'username' }).then((val) => {
      this.credentials['username'] = val;
    });

    autologin(this.apiService, this.router);

    async function autologin(apiService, router) {
      let storagekey = await Preferences.get({ key: 'key' });
      let storageuserid = await Preferences.get({ key: 'userid' });
      let storageusername = await Preferences.get({ key: 'username' });
      console.log(storagekey);
      console.log(storageuserid);
      console.log(storageusername);
      if (storagekey.value && storageuserid.value && storageusername.value) {
        console.log('Great, everything is there!!!!');
        apiService.TOKEN = storagekey.value;
        apiService.STUDENT_ID = storageuserid.value;
        apiService.STUDENT_NAME = storageusername.value;
        router.navigate(['/mycourses']);
      } else {
        console.log('ugh, i need to log in first...');
      }
      return {};
    }
  }

  login() {
    let username = (document.getElementById('username') as HTMLInputElement)
      .value;
    let password = (document.getElementById('password') as HTMLInputElement)
      .value;
    this.apiService.STUDENT_NAME = username;
    Preferences.set({ key: 'username', value: username });
    this.apiService.authenticate(username, password).subscribe(
      (data) => {
        Preferences.set({ key: 'key', value: data['token'] });
        let storagekey = data['token'];
        this.apiService.TOKEN = storagekey;
        this.router.navigate(['/mycourses']);
      },
      (error) => {
        console.log('This is the error', error);
        this.errorobj = error;
        for (let i = 0; i < Object.keys(error).length; i++) {
          let e = Object.keys(error)[i];
          if (e != 'client') {
            this.errors.push(error[e]);
            this.errorkeys.push(e);
          }
        }
      }
    );
    this.apiService.getuserid(username).subscribe(
      (data) => {
        Preferences.set({ key: 'userid', value: data['id'] });
        let storageuserid = data['id'];
        this.apiService.STUDENT_ID = storageuserid;
        console.log(data['id']);
      },
      (error) => {}
    );
  }
}
