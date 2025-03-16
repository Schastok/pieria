import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
  standalone: false,
})
export class DeleteAccountPage implements OnInit {
  opt = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}

  delete() {
    this.opt = 3;
    this.apiService.deleteaccount().subscribe(
      (data) => {
        console.log(data);
        this.opt = 1;
      },
      (error) => {
        this.opt = 2;
      }
    );
  }
  goBack() {
    this.location.back();
  }
}
