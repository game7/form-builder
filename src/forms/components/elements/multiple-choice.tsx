import * as React from 'react';
import { FormEvent } from 'react';
import { IFormControlProps, FormControl } from './form-control';
import { shuffle } from 'lodash';

interface IProps extends IFormControlProps {
  multiple?: boolean,
  randomize?: boolean,
  options: string
}

function normalizeOptions(options: string, randomize: boolean = false) : string[] {
  let array = options.split('\n').filter((opt) => opt !== '');
  return randomize ? shuffle(array) : array;
}

export default class MultipleChoice extends FormControl<IProps, any> {

  options: string[];

  static defaultProps: any = {
    options: ''
  }

  componentWillUpdate = (nextProps: IProps, nextState: any) : void => {
    if(this.props.randomize != nextProps.randomize || this.props.options != nextProps.options) {
      this.options = normalizeOptions(nextProps.options, nextProps.randomize);
    }
  }

  control(): JSX.Element {
    if(!this.options) {
      this.options = normalizeOptions(this.props.options, this.props.randomize)
    }
    let options = this.options;

    if(this.props.multiple) {
      return this.checkboxes(options);
    } else if(options.length >= 8) {
      return this.dropdown(options);
    } else {
      return this.radioButtons(options);
    }
  }

  getValueForMultiple(previous: string, current: string): string {
      let values = previous ? previous.split(',') : [];
      let index = values.indexOf(current);
      if (index >= 0) {
        values.splice(index, 1);
      } else {
        values.push(current);
      }
      return values.join(',');
  }

  getValueFromEvent(event: FormEvent): any {
    let value = event.target['value'];
    if(this.props.multiple) {
      return this.getValueForMultiple(this.value, value);
    }
    console.log(value);
    return value;
  }

  checkbox(value: string, index: number) : JSX.Element {
    return (
      <div className="checkbox" key={`option-${index}`} style={{ marginTop: 0 }}>
        <label>
          <input
            type="checkbox"
            value={value}
            checked={(this.value || '').split(',').indexOf(value) !== -1}
            onChange={this.handleChange}></input>
          {value}
        </label>
      </div>
    )
  }

  checkboxes(options: string[]) : JSX.Element {
    return (
      <div>
        {options.map((option, i) => this.checkbox(option, i))}
      </div>
    );
  }

  option(value: string, index: number) : JSX.Element {
    return (<option value={value} key={`option-${index}`}>{value}</option>);
  }

  dropdown(options: string[]) : JSX.Element {
    const opts = options.map((opt, i) => this.option(opt, i));
    return (
      <select
        className="form-control"
        value={this.value}
        onChange={this.handleChange}>
        <option value=""></option>
        {opts}
      </select>
    );
  }

  radioButton(value: string, index: number) : JSX.Element {
    return (
      <div className="radio" key={`option-${index}`} style={{ marginTop: 0 }}>
        <label>
          <input
            type="radio"
            name={this.props.property}
            value={value}
            checked={value === this.value}
            onChange={this.handleChange}>
          </input>
          {value}
        </label>
      </div>
    )
  }

  radioButtons(options: string[]) : JSX.Element {
    return (
      <div>
        {options.map((opt, i) => this.radioButton(opt, i))}
      </div>
    );
  }


}
