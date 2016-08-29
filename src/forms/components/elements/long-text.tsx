import * as React from 'react';
import { FormEvent } from 'react';
import { IFormControlProps, FormControl } from './form-control';

export default class LongText extends FormControl<IFormControlProps, any> {

  resize : () => void;
  
  control() {
    return (
      <textarea
        className="form-control"
        id={this.props.id}
        value={this.value}
        onFocus={this.handleFocus}
        onChange={this.handleChange}>
      </textarea>
    )
  }

  handleFocus = (event: FormEvent):void => {
    const target = event.target as any;
    target.style.height = target.scrollHeight + 'px';
  }

  handleChange = (event: FormEvent):void => {
    const target = event.target;
    this.resize = () => {
      target['style']['height'] = target['scrollHeight'] + "px";
    }
    const value = this.getValueFromEvent(event);
    this.dirty = true;
    if(this.props.onChange) {
      this.props.onChange(this.props.property, value);
    }
  }

  componentDidUpdate() {
    if(this.resize) {
      this.resize();
      this.resize = null;
    }
  }

}
