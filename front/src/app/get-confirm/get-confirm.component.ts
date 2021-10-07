import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../auth.service';

import { GetConfirmCode } from './get-confirm.interfaces';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss'],
})
export class GetConfirmComponent implements OnInit {
  public getConfirmCode: GetConfirmCode = {
    codeFirst: '',
    codeLast: '',
  };

  public errrorCode: boolean = false;
  public preparingVertifi: boolean = false;
  private finalCodeForChecker: string = '';

  constructor(private authService: AuthService,
    private router: Router, private appComponent: AppComponent) {}

  ngOnInit(): void {}

  public onChangeFirst(event: any) {
    const value = event.target.value;

    if (value.length < 3) {
      this.getConfirmCode.codeFirst = value;
      this.finalCodeForChecker = ''
    } else {
      this.getConfirmCode.codeFirst = value;
      document.getElementById("code2")?.focus()
    }
  }

  public onChangeLast(event: any) {
    const value = event.target.value;

    if (value.length === 0) {
      this.getConfirmCode.codeLast = value;
      document.getElementById("code1")?.focus()
    } else if (value.length < 3) {
      this.getConfirmCode.codeLast = value;
      this.finalCodeForChecker = ''
    } else {
      this.getConfirmCode.codeLast = value;
      this.finalCodeForChecker = this.getConfirmCode.codeFirst + this.getConfirmCode.codeLast;
    }

    if (this.finalCodeForChecker.length === 6) {
      this.preparingVertifi = true
      this.authService.checkuthorize({code: this.finalCodeForChecker})
        .subscribe(
          (res: any) => {
            localStorage.setItem('token', String(res.token));
            this.appComponent.onSelect('order')
            this.finalCodeForChecker = this.getConfirmCode.codeFirst = this.getConfirmCode.codeLast = ''
            this.router.navigate(['/']);
          },
          err => {
            this.finalCodeForChecker = this.getConfirmCode.codeFirst = this.getConfirmCode.codeLast = ''
            this.preparingVertifi = false
          }
        )
    } else {
      this.preparingVertifi = false
    }
  }
}
