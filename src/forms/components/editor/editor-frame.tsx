import * as React from 'react';
import { Component } from 'react';
import FormElement from '../elements/form-element';
import { IFormElement } from '../../data';
import elements from './editor-elements';

interface IProps {
  element: IFormElement,
  onChange: (elementId: string, property: string, value: any) => void,
  expanded: boolean,
  hidden?: boolean,
  onEdit: (id: string) => void,
  onDestroy: (id: string) => void
}

export default class EditorFrame extends Component<IProps, {}> {

  handleEditClick = (event: React.FormEvent) => {
    if(this.props.onEdit) {
      this.props.onEdit(this.props.element.id);
    }
  }

  handleDestroy = (id: string) => (event: React.FormEvent) => {
    this.props.onDestroy(id);
  }

  handleChange = (property, value) => {
    if(property === 'property') {
      value = value.toLowerCase().replace(/[ -]/g,'_');
    }
    if (this.props.onChange) {
      this.props.onChange(this.props.element.id, property, value);
    }
  }

  render() : JSX.Element {
    if(this.props.hidden) {
      return <div>{this.props.children}</div>
    }
    return (
      <Panel>
        <Panel.Heading
          title={this.props.element.type}>
          <button className="btn btn-xs btn-default" onClick={this.handleEditClick}>
            <i className="fa fa-gear"/>{" "}
            Settings
          </button>
          {" "}
          <button className="btn btn-xs btn-default" onClick={this.handleDestroy(this.props.element.id)}>
            <i className="fa fa-trash-o"/>{" "}
            Delete
          </button>
        </Panel.Heading>
        <Panel.Body
          element={this.props.element}
          expanded={this.props.expanded}
          handleChange={this.handleChange}>
          {this.props.children}
        </Panel.Body>
      </Panel>
    );
  }

}

class Panel extends Component<any,any> {

    render() : JSX.Element {
      return (
        <div className="panel panel-default">
          {this.props.children}
        </div>
      );
    }

    static Heading({ title, children = [] }) : JSX.Element {
      return (
        <div className="panel-heading clearfix">
          {title}
          <div style={{float: 'right'}}>
            {children}
          </div>
        </div>
      );
    }

    static Body({ element, expanded, children = [], handleChange }) : JSX.Element {
      const style = {
        backgroundColor: '#f5f5f5',
        display: expanded ? 'block' : 'none'
      };
      const editors = elements[element.type];
      return (
        <div className="list-group">
          <div className="list-group-item">
            {children}
          </div>
          <div className="list-group-item" style={style}>
            {/*<pre>{JSON.stringify(element, null, 2)}</pre>*/}
            {editors.map((editor, index) => (
              <FormElement
                key={index}
                {...editor}
                model={element}
                onChange={handleChange}></FormElement>
            ))}
          </div>
        </div>
      );
    }

}
