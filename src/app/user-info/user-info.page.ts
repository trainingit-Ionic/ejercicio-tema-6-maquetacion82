import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage {

  data: any;

  constructor(private route: ActivatedRoute, private router: Router, private callNumber: CallNumber){ 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state.user) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
        //console.log('user');
        //console.log(this.data);
      }
    });
  }

  call(){
    this.callNumber.callNumber(this.data.phone, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }


}
