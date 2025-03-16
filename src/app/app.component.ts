import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  navigate: any;
  constructor(private platform: Platform) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        StatusBar.setStyle({ style: Style.Default });
        SplashScreen.hide();
      }
    });
  }

  sideMenu() {
    this.navigate = [
      {
        title: 'My Courses',
        url: '/mycourses',
        icon: 'home',
      },
      {
        title: 'My Membership',
        url: '/account',
        icon: 'user',
      },
      {
        title: 'Delete Account',
        url: '/delete-account',
        icon: 'trash',
      },
      {
        title: 'Logout',
        url: '/logout',
        icon: 'log-out',
      },
    ];
  }
}
