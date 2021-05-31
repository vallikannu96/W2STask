
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class AppValidator {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any, controlName?: string) {
      let parent
      let config = {
          'required': `Please enter ${AppValidator.formatControlName(controlName)}`,
          'invalidCreditCard': 'Please enter valid credit card number',
          'invalidEmailAddress': 'Please enter valid email address',
          'invalidPassword': 'Please enter valid password. Password must be at least 8 characters long, contain a number and a capital letter',
          'invalidAzureWindowsPassword': 'Password must be 12 characters long and must have 3 of the following: 1 lower case, 1 upper case, 1 number, 1 special character',
          'notEqual': `Entered ${controlName} doesn\'t match`,
          'minlength': `Minimum length ${validatorValue.requiredLength}`,
          'invalidPercentage': 'Value should be inbetween 0-100',
          'invalidEmailRecipients': 'Please enter valid email address. Multiple emails should be seperated by comma.',
          'invalidUrl': 'Please enter valid url.',
          'invalidPhoneNumber': 'Mobile number must be 10 digits.',
          'invalidPincode': 'Pincode must be 6 digits.',
          'invalidNonEmptyList': 'Please select atleast one value.',
          'invalidPanNumber': 'PAN number must contain 10 digits',
          'invalidUserName': 'Please avoid space in username',
          'maxlength': `Maximum length ${validatorValue.requiredLength}`,
          'invalidInstanceName': 'Please enter valid name without space & special characters',
          'invalidMinimumLength': 'Name must be at least 4 characters long',
          'invalidBucketName' : 'Bucket name must be in lowercase letters',
          'invalidAccesstoken' : 'Please enter valid access token',
          'equalTo': 'Password doesn\'t match'
      };

      return config[validatorName];
  }

  static formatControlName(name: string){
      if(name){
        let c_name = name.replace(/([A-Z]+)/g, ' $1').trim().toLocaleLowerCase();
        c_name = c_name.replace('_', ' ');
        return c_name;
      } 
      else return "input";
  }

  static creditCardValidator(control) {
      // Visa, MasterCard, American Express, Diners Club, Discover, JCB
      if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
          return null;
      } else {
          return { 'invalidCreditCard': true };
      }
  }

  static emailValidator(control) {
      // RFC 2822 compliant regex
      if ((!control.value) || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
          return null;
      } else {
          return { 'invalidEmailAddress': true };
      }
  }

  static passwordValidator(control) {
    // {8,100}           - Assert password is between 8 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    // (?=.*[A-Z])       - Assert a password should have atleast one capital letter 

    if (control.value) {
      if (control.value.match(/^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$/)) {
        return null;
      } else {
        return { 'invalidPassword': true };
      }
    }
  }

  static azureWindowsPasswordValidator(control) {
      // {6,100}           - Assert password is between 12 and 100 characters
      // (?=.*[0-9])       - Assert a string has at least one number
      // (?=.*[!@#$%^&*])  - Assert a special character 
      if (control.value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,100}$/)) {
          return null;
      } else {
          return { 'invalidAzureWindowsPassword': true };
      }
  }

  static nameWithoutSpaceValidator(control) {
      if (control.value.match(/^[a-zA-Z0-9\-_]{0,40}$/)) {
          return null;
      } else {
          return { 'invalidInstanceName': true };
      }
  }

  static upperCaseValidator(control) {
      if (control.value.match(/^[a-z0-9\-_]{0,40}$/)) {
          return null;
      } else {
          return { 'invalidBucketName': true };
      }
  }

  static minimumLengthValidator(control) {
      if (control.value.match(/^.{4,40}$/)) {
          return null;
      } else {
          return { 'invalidMinimumLength': true };
      }
  }

  static percentageValidator(control) {
      // 0-100 percentage value is between 0 to 100
      if (control.value >= 0 && control.value <= 100) {
          return null;
      } else {
          return { 'invalidPercentage': true };
      }
  }

  static multipleEmailValidator(control) {
      // Multiple emails seperated by comma regex
      if (control.value.match(/(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*,\s*|\s*$))+/)) {
          return null;
      }
      else {
          return { 'invalidEmailRecipients': true };
      }
  }

  static urlValidator(control) {
      // Url regex
      if (!control.value || control.value.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/)) {
          return null;
      }
      else {
          return { 'invalidUrl': true };
      }
  }

    static numberValidator(control) {
        var number = new RegExp("^[0-9]{1,3}$")

        if (!control.value || control.value && number.test(control.value)) {
            return null;
        }
        else {
            return { 'invalid number': "Invalid number" };
        }
    }

    static yearValidator(control) {
        var number = new RegExp("^[0-9]{1,4}$")

        if (!control.value || control.value && number.test(control.value)) {
            return null;
        }
        else {
            return "Invalid Year";
        }
    }

  static phoneValidator(control) {
      var phoneNumber = new RegExp("^[0-9]{10}$")

      if (!control.value || control.value && phoneNumber.test(control.value)) {
          return null;
      }
      else {
          return { 'invalidPhoneNumber': true };
      }
  }
  static pincodeValidator(control) {
    var pincode = new RegExp("^[0-9]{6}$");
    if (!control.value || control.value && pincode.test( control.value)) {
        return null;
    }
    else {
        return { 'invalidPincode': true };
    }
}

  static pancardValidator(control) {
      var pan_number = /^[a-zA-Z0-9_.-]*$/;
      if (control.value.match(pan_number) || null) {
          return null;
      }
      else {
          return { 'invalidPanNumber': true };
      }


  }

  static nonEmptylistValidator(control) {
      // Checks is array & has Minimum one item in array
      if (control.value instanceof Array && (control.value.length > 0)) {
          return null;
      }
      else {
          return { 'invalidNonEmptyList': true };
      }
  }

  static equalValidator(group) {
      // Checks all values of controls in group are equal
      let controlNames: Array<string> = Object.keys(group.value);
      let first: string = controlNames.splice(0, 1)[0];

      for (let controlName of controlNames) {
          if (group.controls[first].touched && group.controls[controlName].touched && group.value[controlName] != group.value[first]) {
              return { 'notEqual': true };
          }
      }
      return null;
  }

  static userNameValidator(control) {
      var regex = /[^A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g; //_@./#&+-
      if(control.value != null){
          if (!control.value.match(regex)) {
              return null;
          }
          else {
              return { 'invalidUserName': true };
          }
      }
  }

  static accessTokenvalidator(control) {
      if(control.value.length == 32){
          return null;
      }
      else {
          return {'invalidAccesstoken':true};
      }
  }

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
static confirmPasswordValidator(control): ValidationErrors | null  {

    if (!control.parent || !control) {
      return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
      return null;
    }

    if (passwordConfirm.value === '') {
      return null;
    }

    if (password.value === passwordConfirm.value) {
      return null;
    }

    return { passwordsNotMatching: true };
  };

}

