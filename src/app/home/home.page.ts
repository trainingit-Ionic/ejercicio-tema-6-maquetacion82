import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Router, NavigationExtras } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users: Array<any>;
  user: User;

  constructor(private userService: UserService, private router: Router, private callNumber: CallNumber) {
    this.userService.get().subscribe(
      data => {
          this.users = data;
          console.log(data);
      },
      error => {
        console.log('error');
      },
    );
   }

   viewItem(i: number) {
     this.userService.getOne(i).subscribe(
      data => {
        this.user = data;
        console.log(data);
        const navigatioExtras: NavigationExtras = {
          state: {
            user: this.user
          }
        };
        this.router.navigate(['user-info'], navigatioExtras);
      },
      error => {
        console.log('error');
      },
     );
   }

   call(phone) {
    if (phone !== undefined) {
      this.callNumber.callNumber(phone, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }
  }
}
