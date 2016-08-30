import * as React from 'react';
import { Component } from 'react';

type ClickHandler = () => void;

interface IElement {
  type: string,
  label: string
}

const elements : IElement[] = [
  {
    type: 'short-text',
    label: 'Short Text'
  },
  {
    type: 'long-text',
    label: 'Long Text'
  },
  {
    type: 'checkbox',
    label: 'Checkbox'
  },
  {
    type: 'multiple-choice',
    label: 'Multiple Choice',
  },
  {
    type: 'statement',
    label: 'Statement'
  },
  {
    type: 'email',
    label: 'Email'
  }
]

interface IProps {
  onElementPicked: (element: any) => void
}

export default class ElementPicker extends Component<IProps,{}> {

  render() {
    return (
      <div>
        <Accordion>
          <Accordion.Section title="Elements"/>
          <Accordion.ItemGroup>
            {elements.map((e, i) => {
              return (
                <Accordion.Item
                  key={i}
                  element={e}
                  onClick={this.props.onElementPicked}
                />
              )
            })}
          </Accordion.ItemGroup>
        </Accordion>
      </div>
    );
  }

}

class Accordion extends Component<{},{}> {

    render() {
      return (
        <div className="panel panel-default">
          {this.props.children}
        </div>
      );
    }

    static Section(props: { title: string }) : JSX.Element {
      return (
        <div className="panel-heading">
          <h3 className="panel-title">{props.title}</h3>
        </div>
      );
    }

    static ItemGroup(props: { children?: any[] }) : JSX.Element {
      return (
        <div className="list-group">
          {props.children}
        </div>
      );
    }

    static Item(props: { element: IElement, onClick: (IElement) => void }) : JSX.Element {
      const handleClick = (event: any) : void => {
        event.target.blur();
        props.onClick(Object.assign({}, props.element));
      }
      return (
        <div className="list-group-item clearfix">
          <div className="pull-left">
            {props.element.label}
          </div>
          <div className="pull-right">
            <button
              className="btn btn-xs btn-default"
              onClick={handleClick}>
              <i className="fa fa-plus"/>{" "}
              Add
            </button>
          </div>
        </div>
      );
    }


}
