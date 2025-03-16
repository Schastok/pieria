import { Component, OnInit } from '@angular/core';
declare var Stripe;
import { HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: false,
})
export class PaymentPage implements OnInit {
  stripe = Stripe('YOUR_PUBLISHABLE_KEY');
  card: any;
  currencyIcon;
  paymentAmount;
  product;
  productid;
  subscription_model;
  product_name;
  price;
  tax;
  tax_amount;
  total_amount;
  payment_cycle;
  currency_symbol;
  currency;
  result;
  url;

  pollingData: any;
  value: any = '';
  pollingFreq: number | undefined;
  pollingCount: number | undefined;
  polling;
  paymentsession;
  paymentstatus;
  paymenttoken;
  pollingresult;
  paymentstatus_info;
  router;
  waiting = true;
  paymentwaiting = false;
  browser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private iab: InAppBrowser,
    private apiService: ApiService,
    private routing: Router
  ) {
    this.router = routing;
  }

  ngOnInit() {
    //   this.setupStripe();

    this.paymentstatus = 0;

    this.apiService.getproductdetails().subscribe((data) => {
      this.waiting = false;
      this.polling = 0;
      console.log('calling product api');
      console.log(data);
      this.product = data[0];
      this.productid = this.product.product_id;
      this.subscription_model = this.product.subscription_model;
      this.product_name = this.product.product_name;
      this.price = this.product.price / 100;
      this.tax = this.product.tax;
      this.tax_amount = this.product.tax_amount / 100;
      this.total_amount = this.product.total_amount / 100;
      this.payment_cycle = this.product.payment_cycle;
      this.currency_symbol = this.product.currency_symbol;
      this.currency = this.product.currency;
    });
  }

  openBlank() {
    console.log(this.productid);
    this.apiService.getpaymentsession(this.productid).subscribe((data) => {
      console.log('calling paymentsession api');
      console.log(data);
      this.paymentsession = data;
      console.log(data['token']);
      this.paymenttoken = data['token'];
      this.paymentstatus = 1;
      this.poll();
      this.openpaymentpage();
    });
  }

  openpaymentpage() {
    this.paymentwaiting = true;
    if (this.apiService.TEST) {
      this.url = 'http://localhost:8000/payment/' + this.paymenttoken + '/';
    } else {
      this.url = 'https://www.e-fluent.com/payment/' + this.paymenttoken + '/';
    }
    //this.iab.create(this.url, '_blank');
    this.browser = this.iab.create(this.url, '_blank');
  }

  poll() {
    let count = 0;
    this.pollingData = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.value + 's')
      )
      .subscribe(
        (res) => {
          count += 1;
          this.polling = 1;
          this.value = count;
          console.log(this.value);
          if (count < 50 && this.paymentstatus == 1) {
            console.log(count);
            console.log(this.paymentstatus);
            this.apiService
              .getsessionpolling(this.paymenttoken)
              .subscribe((data) => {
                console.log('calling sessionpolling api');
                console.log(data);
                this.pollingresult = data;
                this.paymentstatus_info = this.pollingresult.status_info;
                this.paymentstatus = this.pollingresult.status;
              });
          } else if (this.paymentstatus != 1) {
            this.paymentwaiting = false;
            this.pollingData.unsubscribe();
            this.polling = 3;
            this.browser.close();
          } else if (count >= 50) {
            this.pollingData.unsubscribe();
            this.polling = 4;
            this.paymentwaiting = false;
            this.browser.close();
          }
          if (this.paymentstatus === 2) {
            this.paymentwaiting = false;
            this.router.navigate(['/account']);
            this.browser.close();
          }
        },
        (error) => {}
      );
  }

  reload() {
    this.router.navigate(['/account']);
  }

  /*

    setupStripe() {
      let elements = this.stripe.elements();
      var style = {
        base: {
          color: '#32325d',
          lineHeight: '24px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      };

      this.card = elements.create('card', { style: style });
      console.log(this.card);
      this.card.mount('#card-element');

      this.card.addEventListener('change', event => {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });

      var form = document.getElementById('payment-form');
      form.addEventListener('submit', event => {
        event.preventDefault();
        console.log(event)

        this.stripe.createSource(this.card).then(result => {
          if (result.error) {
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            console.log(result);
            this.stripe.makePayment(result.id);
          }
        });
      });
    }

*/
}
