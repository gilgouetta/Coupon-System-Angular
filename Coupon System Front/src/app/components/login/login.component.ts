import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { ClientType } from 'src/app/models/clientType';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MenuComponent]
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  email: string = '';
  // tslint:disable-next-line: no-inferrable-types
  password: string = '';
  submitted = false;
  public clientType: ClientType;
  public user?: User;
  loginForm: FormGroup;
  constructor(private authenticationService: AuthenticationService, private menuComponent: MenuComponent) { }
  ngOnInit() {}
public isInvalid(): boolean {
  return this.loginForm.invalid;
}

  public onSubmit() {
    this.authenticationService.login(this.email, this.password, this.clientType);
    this.menuComponent.refresh() ; // this should refresh the menu
  }
  public logout() {
    this.authenticationService.logout();
  }


}
