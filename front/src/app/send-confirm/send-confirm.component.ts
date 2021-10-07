import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-confirm',
  templateUrl: './send-confirm.component.html',
  styleUrls: ['./send-confirm.component.scss']
})
export class SendConfirmComponent implements OnInit {

  public code = ''

  constructor() { }

  ngOnInit(): void {
    const urlArr = window.location.pathname.split('/')
    this.code = urlArr[urlArr.length - 1].toString()
  }

}
