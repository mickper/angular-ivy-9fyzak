import { Component, OnInit, VERSION } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

class PasswordValidators {
  static checkConfirm(otherPropertyName: string) {
    return (passControl: FormControl) => {
      // Renvoie un objet si probleme
      // Renvoie null si tout va bien !
      const actualValue = passControl.value;

      if (!passControl.parent) {
        return null;
      }

      const otherControl: FormControl =
        passControl.parent.controls[otherPropertyName];
      const otherPasswordValue = otherControl.value;

      if (actualValue === otherPasswordValue) {
        return null;
      }

      return {
        confirm: 'Les mots de passes ne match pas.',
      };
    };
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  public globalForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();

    const pseudoControl = this.globalForm.get('pseudo') as FormControl;
    pseudoControl.valueChanges.subscribe((value) => {
      console.log('Voici le nouveau pseudo : ', value);
    });
  }

  private buildForm() {
    this.globalForm = this.fb.group({
      pseudo: ['', Validators.required],
      password: ['', [Validators.required]],
      passwordConfirm: [
        '',
        [Validators.required, PasswordValidators.checkConfirm('password')],
      ],
    });
  }

  public onSubmit() {
    console.log(this.globalForm.value);
  }
}
