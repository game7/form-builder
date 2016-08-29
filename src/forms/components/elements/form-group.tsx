import * as React from 'react';

interface IProps {
  id: string,
  label?: string,
  required?: boolean,
  errors?: string[]
}

interface IState {}

class FormGroup extends React.Component<IProps,IState> {

  static defaultProps = {
    errors: []
  }

  render() {
    return (
      <div className={this.className()}>
        {this.label()}
        {this.props.children}
        {this.errors()}
      </div>
    )
  }

  className() {
    return [
      'form-group',
      this.props.required ? 'required' : '',
      this.props.errors.length > 0 ? 'has-error' : ''
    ].join(" ")
  }

  label() {
    if(this.props.label) {
      return (
        <label className="control-label s" htmlFor={this.props.id}>
          {this.props.label} {this.required()}
        </label>
      );
    }
  }

  required() {
    if(this.props.required) {
      return (<abbr title="required">*</abbr>)
    }
  }

  errors() {
    return this.props.errors.map(function(msg, i) {
      return (<div className="help-block" key={i}>{msg}</div>);
    })
  }

}

export default FormGroup;
