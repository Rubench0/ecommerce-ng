import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) { 
    this.form = this._formBuilder.group({
      email: [
        '', [
            Validators.required,
            Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
            
          ]
      ],
      password: [
        '', [
          Validators.required,
        ]
      ]
      });

  }

  ngOnInit(): void {
  }

}
