import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})
export class AccountPage implements OnInit {
  username;
  subscription_model;
  creation_date;
  change_date;
  payment_method;
  account;
  status;
  waiting = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.waiting = true;

    console.log('ionViewDidEnter ');
    this.apiService.getaccountdetails().subscribe((data) => {
      console.log(data);
      this.waiting = false;
      this.account = data[0];
      this.username = this.account.username;
      this.subscription_model = this.account.subscription_model;
      this.creation_date = this.account.creation_date;
      this.change_date = this.account.change_date;
      this.payment_method = this.account.payment_method;
      this.status = this.account.status;
    });
  }
  goBack() {
    this.location.back();
  }
}
