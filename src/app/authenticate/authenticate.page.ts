import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
  standalone: false,
})
export class AuthenticatePage implements OnInit {
  credentials = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
  ) {
    // this.platform.backButton.subscribeWithPriority(-1, () => {
    //   console.log('HW button pressed, exiting....');
    //   App.exitApp();
    // });
  }

  ngOnInit() {
    //this.storage.remove('userid');
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
        router.navigate(['/login']);
      }
      return {};
    }
  }
}
