import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { ApiService } from '../api.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
  standalone: false,
})
export class LogoutPage implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    Preferences.remove({ key: 'userid' }).then((val) => {
      Preferences.remove({ key: 'key' }).then((val) => {
        Preferences.remove({ key: 'username' }).then((val) => {
          this.router.navigate(['/login']);
        });
      });
    });
  }
}
