import { Component, OnInit, Input } from '@angular/core';
import { Password } from "../password.model";

@Component({
  selector: 'app-password-display-card',
  templateUrl: './password-display-card.component.html',
  styleUrls: ['./password-display-card.component.scss', '../shared/common.scss']
})
export class PasswordDisplayCardComponent implements OnInit {

  @Input() password: Password;

  constructor() { }

  ngOnInit() {
  }

}
