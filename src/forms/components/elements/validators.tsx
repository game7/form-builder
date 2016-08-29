import * as React from 'react';
import { FormControl, IFormControlProps } from './form-control'

export const required = (control: FormControl<IFormControlProps, any>): string[] => {
  let errors = [];
  if(control.props.required) {
    if(!control.value || control.value === '') {
      return ['Can\'t be blank'];
    }
  }
  return errors;
}
