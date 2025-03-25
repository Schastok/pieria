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
      if (storagekey.value && storageuserid.value && storageusername.value) {
        console.log('Great, everything is there!!!!');
        apiService.TOKEN = storagekey.value;
        apiService.STUDENT_ID = storageuserid.value;
        apiService.STUDENT_NAME = storageusername.value;
        router.navigate(['/mycourses']);
      } else {
        console.log('ugh, i need to log in first...');
        console.log('Retrieved key:', storagekey.value);
        console.log('Retrieved userid:', storageuserid.value);
        console.log('Retrieved username:', storageusername.value);
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
        console.log('Saved key: ', data['token']);
        let storagekey = data['token'];
        this.apiService.TOKEN = storagekey;
        console.log('Saved ID: ', this.apiService.STUDENT_ID);
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
      async (data) => {
        console.log('Received user ID:', data['id']); // Check if it's null or undefined
        if (!data['id']) {
          console.log('Error: User ID is undefined or null');
          return;
        }
        await Preferences.set({ key: 'userid', value: String(data['id']) });
        let storedUserId = (await Preferences.get({ key: 'userid' })).value;
        console.log('Stored userid:', storedUserId);
        this.apiService.STUDENT_ID  = storedUserId;
      }
    );
  }
}
