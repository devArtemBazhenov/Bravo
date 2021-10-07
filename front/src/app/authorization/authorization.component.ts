import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AutorizationUser } from './authorization.interfaces';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  public authorizationUser: AutorizationUser = {
    email: '',
  }

  public form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ])
  })

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public authorization() {
    if (this.form.get('email')?.invalid) {
      console.log('Login invalid')
    } else {
      this.authorizationUser.email = this.form.get('email')?.value

      this.authService.authorization(this.authorizationUser)
        .subscribe(
          err => console.log(err),
          res => this.router.navigate(['/confirming'])
        )
    }
  }

}
