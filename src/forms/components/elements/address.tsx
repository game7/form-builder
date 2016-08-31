import * as React from 'react';
import { Component } from 'react';
import ShortText from './short-text'
import { PropertyChanged } from './form-control';

interface AddressProps {
  model: any;
  property: string;
  onChange: PropertyChanged;
}

export default class Address extends Component<AddressProps,{}> {

  get model(): any {
    return this.props.model ? this.props.model[this.props.property] : {};
  }

  handleChange = (property: string, value: any) => {
    let model = Object.assign({}, this.model);
    model[property] = value;
    this.props.onChange(this.props.property, model);
  }

  render() {
    return (
      <div>
        <ShortText
          id="street"
          model={this.model}
          property="street"
          label="Street"
          onChange={this.handleChange}
          required={true} />
        <div className="row">
          <div className="col-sm-5">
            <ShortText
              id="city"
              model={this.model}
              property="city"
              label="City"
              onChange={this.handleChange}
              required={true} />
          </div>
          <div className="col-sm-4">
            <ShortText
              id="state"
              model={this.model}
              property="state"
              label="State"
              onChange={this.handleChange}
              required={true} />
          </div>
          <div className="col-sm-3">
            <ShortText
              id="postal_code"
              model={this.model}
              property="postal_code"
              label="Postal Code"
              onChange={this.handleChange}
              required={true} />
          </div>
        </div>
      </div>
    );
  }

}
