import { Password } from './../password.model';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";

import * as firebase from 'firebase';

interface DialogData {
  firebasePath: string
  password?: Password
}

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {

  private data: DialogData
  private formPassword: Password
  private passwordKey: string

  constructor(private dialogRef: MdDialogRef<PasswordDialogComponent>) { 
    this.data = dialogRef.config.data
    this.formPassword = new Password()
    if (this.data.password) {
      Object.assign(this.formPassword, this.data.password)
      this.passwordKey = this.data.password.$key
    } 
  }

  ngOnInit() {
  }

  onSubmit() {
    try {
      if (this.passwordKey){
        firebase.database().ref().child(this.data.firebasePath).child(this.passwordKey).set(this.formPassword)
      } else {
        firebase.database().ref().child(this.data.firebasePath).push(this.formPassword)
      }
      this.dialogRef.close()
    } catch(e) {
      console.log("Error: ", e)
    }
  }
}
