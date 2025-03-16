import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Location } from '@angular/common';
import { StatusBar } from '@capacitor/status-bar';
import { Preferences } from '@capacitor/preferences';
@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.page.html',
  styleUrls: ['./coursedetails.page.scss'],
  standalone: false,
})
export class CoursedetailsPage implements OnInit {
  ClassroomId;
  ClassroomName;
  ClassroomDescription;
  ClassroomImage;
  New;
  Coursedetails1;
  Coursedetails2;
  Coursedetails3;
  Coursedetails4;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,

    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private location: Location
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('ClassroomId')) {
        //redirect
        return;
      }
      if (!paramMap.has('ClassroomImage')) {
        //redirect
        return;
      }
      if (!paramMap.has('ClassroomDescription')) {
        //redirect
        return;
      }
      if (!paramMap.has('ClassroomName')) {
        //redirect
        return;
      }
      if (!paramMap.has('new')) {
        //redirect
        return;
      }
      this.ClassroomId = paramMap.get('ClassroomId');
      this.ClassroomImage = paramMap.get('ClassroomImage');
      this.ClassroomDescription = paramMap.get('ClassroomDescription');
      this.ClassroomName = paramMap.get('ClassroomName');
      this.New = paramMap.get('new');

      this.apiService.getclsdetails(this.ClassroomId).subscribe((data) => {
        this.Coursedetails1 = data[0]['Classroom_overview_field1'];
        this.Coursedetails2 = data[0]['Classroom_overview_field2'];
        this.Coursedetails3 = data[0]['Classroom_overview_field3'];
        this.Coursedetails4 = data[0]['Classroom_overview_field4'];
      });

      console.log(
        this.ClassroomName,
        this.ClassroomImage,
        this.ClassroomId,
        this.Coursedetails1,
        this.Coursedetails2,
        this.Coursedetails3,
        this.Coursedetails4
      );
    });
  }

  async presentAlertConfirm(Classroom_ID, Classroom_Name) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: Classroom_Name,
      message: 'Do you want to sign up to this classroom?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes!',
          handler: () => {
            console.log('Sign up to Classroom: ', Classroom_ID);

            this.apiService
              .getstudentassigned(Classroom_ID)
              .subscribe((data) => {
                console.log(data);
                if (!data['assigned']) {
                  this.presentAlert();
                } else {
                  this.router.navigate(['/mycourses']);
                }
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sorry',
      subHeader: 'Something went wrong :(',
      message: 'It was not possible to sign you up for this classroom',
      buttons: ['OK'],
    });

    await alert.present();
  }

  goBack() {
    this.location.back();
  }
}
