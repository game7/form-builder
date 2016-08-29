import * as React from 'react';
import { Component, FormEvent } from 'react';
import { IFormControlProps, FormControl } from './form-control';
import FormGroup from './form-group';

export default class ShortText extends FormControl<IFormControlProps, any> {

  control(): JSX.Element {
    return (
      <input
        type="text"
        className="form-control"
        id={this.props.id}
        value={this.value}
        onChange={this.handleChange}>
      </input>
    )
  }

}
