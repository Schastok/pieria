import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cancelsubscription',
  templateUrl: './cancelsubscription.page.html',
  styleUrls: ['./cancelsubscription.page.scss'],
  standalone: false,
})
export class CancelsubscriptionPage implements OnInit {
  cancel = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}

  delete() {
    this.cancel = 3;
    this.apiService.cancelsubscription().subscribe(
      (data) => {
        console.log(data);
        this.cancel = 1;
      },
      (error) => {
        this.cancel = 2;
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
