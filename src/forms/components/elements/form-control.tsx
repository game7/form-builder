import * as React from 'react';
import { FormEvent } from 'react';
import FormGroup from './form-group';
import { Validator } from './validators';

export interface IFormControlProps {
  id: string,
  property: string,
  model: any,
  label?: string,
  required?: boolean,
  onChange?: PropertyChanged
}

export type PropertyChanged = (property: string, value: any) => void;

export class FormControl<P extends IFormControlProps, S>
  extends React.Component<P, S> {

  validator: Validator<FormControl<P, S>> = new Validator<FormControl<P, S>>();
  dirty: boolean = false;

  constructor() {
    super();
    this.validator.ensure('value').required().when((model: any) => {
      return this.props.required;
    });
  }

  get label(): string {
    return this.props.hasOwnProperty('label') ? this.props.label : this.props.property;
  }

  get value(): any {
    return (this.props.model || {})[this.props.property];
  }

  getValueFromEvent(event: FormEvent) : any {
    return event.target['value'];
  }

  handleChange = (event: FormEvent) : void => {
    const value = this.getValueFromEvent(event);
    this.dirty = true;
    if(this.props.onChange) {
      this.props.onChange(this.props.property, value);
    }
  }

  control() {
    return (
      <pre>Not Implemented</pre>
    )
  }

  render() {
    const errors = this.dirty ? this.validator.validate(this) : [];
    return (
      <FormGroup
        id={this.props.id}
        label={this.label}
        required={this.props.required}
        errors={errors}>
        {this.control()}
      </FormGroup>
    )
  }

}
