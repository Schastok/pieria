import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  TEST = false;
  URL;
  CLASSROOM_DATA;
  CLASSROOM_ID = '0';
  STUDENT_ID = '4';
  SIZE;
  TOKEN;
  STUDENT_NAME;
  MARKET_ID = '1';
  PROJECT_ID = '1';

  constructor(private httpClient: HttpClient) {
    if (this.TEST) {
      this.URL = 'http://127.0.0.1:8000';
      this.CLASSROOM_ID = '1';
      this.STUDENT_ID = '';
      this.SIZE = '10';
    } else {
      this.URL = 'https://www.e-fluent.com';
      this.STUDENT_ID = '';
      this.SIZE = '15';
    }
  }

  private handleError(error: HttpErrorResponse) {
    let result;
    console.log('enter error');
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error.message);
      result = { client: error.error.message };
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.log(`Backend returned code ${error.status}`);
      result = error.status;
    }
    // Return an observable with a user-facing error message.
    return throwError(result);
  }

  private handleError2(error: HttpErrorResponse) {
    let result;
    console.log('enter error');
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error.message);
      result = { client: error.error.message };
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.log(`Backend returned code ${error.status}`);
      result = error.error;
    }
    // Return an observable with a user-facing error message.
    return throwError(result);
  }

  getLessons() {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    console.log(token);
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_lessons_2/?project=${this.CLASSROOM_ID}`,
      { headers: headers }
    );
  }

  getSections(lessonID: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);

    return this.httpClient.get(
      `${this.URL}/api_sections_2/?lesson=${lessonID}`,
      { headers: headers }
    );
  }

  getFlipcards(lessonID: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_flipcardlist_2/?lesson=${lessonID}&student=${this.STUDENT_ID}`,
      { headers: headers }
    );
  }

  getEcercises(lessonID: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_excercises_2/?lesson=${lessonID}&student=${this.STUDENT_ID}`,
      { headers: headers }
    );
  }

  getSection_details(sectionID: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient
      .get(
        `${this.URL}/api_section_2/?section=${sectionID}&project=${this.PROJECT_ID}`,
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }

  getFlipcardset(lessonID: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_flipcards_2/?lesson=${lessonID}&student=${this.STUDENT_ID}&size=${this.SIZE}`,
      { headers: headers }
    );
  }

  //getFlipcardset(lessonID: string){
  //  return this.httpClient.get(`${this.URL}/api_flipcards/?lesson=${lessonID}&student=${this.STUDENT_ID}&size=${this.SIZE}`);
  //}

  getFlipcardlist(lessonID: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_flipcards_2/?lesson=${lessonID}&student=${this.STUDENT_ID}`,
      { headers: headers }
    );
  }

  getExerciselist(lessonID: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_excercises_2/?lesson=${lessonID}&student=${this.STUDENT_ID}`,
      { headers: headers }
    );
  }

  getExercise(quizID: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_excercise_content_2/?excercise=${quizID}&project=${this.PROJECT_ID}`,
      { headers: headers }
    );
  }

  getExerciseEval(evalID: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_excercise_eval_2/?excercise=${evalID}`,
      { headers: headers }
    );
  }

  postupdateprogress(
    progressid: string,
    statusstr: string,
    answerlist: string
  ) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    let postData = {
      progressid: progressid,
      progress: statusstr,
      answer: answerlist,
    };
    return this.httpClient.post(`${this.URL}/api_updateprogress_2/`, postData, {
      observe: 'body',
      headers: headers,
    });
  }

  postquiz(quizdata: any, quizid: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    let postData = quizdata;
    postData['excercise'] = quizid;
    postData['student'] = this.STUDENT_ID;
    delete postData.null;
    console.log(postData);
    return this.httpClient.post(`${this.URL}/api_evaluate_2/`, postData, {
      observe: 'body',
      headers: headers,
    });
  }

  authenticate(username: string, password: string) {
    let postData = {
      username: username,
      password: password,
    };
    return this.httpClient
      .post(`${this.URL}/api-token-auth/`, postData, { observe: 'body' })
      .pipe(catchError(this.handleError2));
  }

  register(password: string, email: string) {
    let postData = {
      password: password,
      first_name: 'S_M_V2',
      username: email,
      email: email,
    };
    console.log(postData);
    return this.httpClient
      .post(`${this.URL}/api_signup/`, postData, { observe: 'body' })
      .pipe(catchError(this.handleError2));
  }

  getuserid(username: string) {
    return this.httpClient.get(`${this.URL}/api_userid/?username=${username}`);
  }

  getcls() {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(`${this.URL}/api_allclassrooms/`, {
      headers: headers,
    });
  }

  getstudentcls() {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_classrooms/?student=${this.STUDENT_ID}`,
      { headers: headers }
    );
  }

  getaccountdetails() {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_accountdetails/?student=${this.STUDENT_ID}`,
      { headers: headers }
    );
  }

  getproductdetails() {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_productdetails/?market=${this.MARKET_ID}&project=${this.PROJECT_ID}`,
      { headers: headers }
    );
  }

  getpaymentsession(product: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_paymentsession/?student=${this.STUDENT_ID}&product=${product}`,
      { headers: headers }
    );
  }

  getsessionpolling(pmtoken: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_paymentsessionpolling/?student=${this.STUDENT_ID}&pmtoken=${pmtoken}`,
      { headers: headers }
    );
  }

  getstudentassigned(classroom: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_classroomsignup/?student=${this.STUDENT_ID}&classroom=${classroom}`,
      { headers: headers }
    );
  }

  getclsdetails(classroom: string) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_classroomdetails/?classroom=${classroom}`,
      { headers: headers }
    );
  }

  deleteaccount() {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_delete/?student=${this.STUDENT_ID}`,
      { headers: headers }
    );
  }

  cancelsubscription() {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    return this.httpClient.get(
      `${this.URL}/api_cancelsubscription/?student=${this.STUDENT_ID}`,
      { headers: headers }
    );
  }

  uploadaudio(file) {
    let headers = new HttpHeaders();
    let token = 'Token ' + this.TOKEN;
    headers = headers.set('Authorization', token);
    headers.set('content-type', 'audio/mpeg');
    return this.httpClient
      .post(
        `${this.URL}/api_audioupload/`,
        { file: file },
        { observe: 'body', headers: headers }
      )
      .pipe(catchError(this.handleError));
  }
}
