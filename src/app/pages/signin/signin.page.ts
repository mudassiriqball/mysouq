
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  constructor() {
  }
  ngOnInit() {
  }

  // fbClicked(){
  //   const url = "http://localhost:5000/home";
  //   fetch(url)
  //   .then(res => res.json())
  //   .then( res2 => console.log('res2:', res2));
  // }

  

  fbClicked() {
    // const url = "http://localhost:5000/sent";
    // fetch(url, {
    //   method: "post",
    //   body: 'name=Majid&favColor=blue&password=easytoguess',
    //   headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    // }).then(res => res.json())
    // .then(res2 => console.log("ersssss:", res2));
  }
}
