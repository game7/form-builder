import * as React from 'react';
import { FormEvent } from 'react';
import { IFormControlProps, FormControl } from './form-control';

interface IProps extends IFormControlProps {
  text: string
}

export default class Checkbox extends FormControl<IProps, any> {

  getValueFromEvent(event: FormEvent) : any {
    return event.target['checked'];
  }

  control(): JSX.Element {
    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            id={this.props.id}
            checked={this.value}
            onChange={this.handleChange}>
          </input>
          {this.props.text}
        </label>
      </div>
    )
  }

}
