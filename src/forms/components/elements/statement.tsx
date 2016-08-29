import * as React from 'react';

interface IProps {
  text: string
}

export default class Statement extends React.Component<IProps, any> {
  render() {
    return (
      <pre>{this.props.text}</pre>
    );
  }
}
