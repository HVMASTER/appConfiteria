import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IUserLogin } from 'src/app/models/IUserLogin';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  listUser: UserModel[] = [
    new UserModel('Jorge','Gomez','jgomez@gmail.com',undefined,'USUARIO','jgomez','jorge123'),
    new UserModel('Juan','Perez','jperez@gmail.com',undefined,'ADMIN','jperez','juan123'),
    new UserModel('Carlos','Gomez','cgomez@gmail.com',undefined,'USUARIO','cgomez','carlos123'),
    new UserModel('Valentina','Gomez','vgomez@gmail.com',undefined,'ADMIN','vgomez','valentina123')
  ];

  userLoginModal: IUserLogin = {
    user: '',
    pass: ''
  };

  constructor(private route: Router) { }

  ngOnInit() {
    this.userLoginModalRestart();
  }

  userLogin(userLoginInfo: IUserLogin): boolean{
    for(let i = 0; i < this.listUser.length; i++){
      if((this.listUser[i].username == userLoginInfo.user) && (this.listUser[i].password == userLoginInfo.pass)){
        console.log('User Loged...', this.userLoginModal.user, this.userLoginModal.pass);
        let userInfoSend: NavigationExtras = {
          state: {
            user: this.listUser[i]
          }
        }
        if(this.listUser[i].type == 'USUARIO'){
          let sendInfo = this.route.navigate(['/usuario'], userInfoSend);
          return true;
        }else{
          let sendInfo = this.route.navigate(['/admin'], userInfoSend);
          return true;
        }
      }
    }
    this.userLoginModalRestart();
    return false;
    
  }

  userLoginModalRestart(): void{
    this.userLoginModal.user = '';
    this.userLoginModal.pass = '';
  }

}
