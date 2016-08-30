import * as React from 'react';
import { IForm, IFormElement, Store } from './data';
import EditorFrame from './components/editor/editor-frame';
import FormElement from './components/elements/form-element';
import ElementPicker from './components/editor/element-picker';
import { PropertyChanged } from './components/elements/form-control';

interface IState {
  form?: IForm,
  editing?: string,
  panel?: boolean,
  data?: any,
  display?: string
}

export default class Show extends React.Component<any, IState> {

  constructor() {
    super()
    this.state = {
      form: null,
      data: {},
      display: 'edit'
    } as IState;
  }

  componentWillMount() {
    Store.find(this.props.routeParams.id).then((form) => {
      this.setState({
        form: form
      });
    });
  }

  handleModelChange = (property: string, value: any) : void => {
    let state = Object.assign({}, this.state);
    state.data[property] = value;
    this.setState(state);
  }

  handleElementChange = (id: string, property: string, value: any) : void => {
    let form = Object.assign({}, this.state.form);
    form.elements.forEach((element) => {
      if(element.id === id) {
        element[property] = value;
      }
    });
    this.setState({form: form});
  }

  handleMoveUp = (id: string) => {
    this.moveElement(id, -1);
  }

  handleMoveDown = (id: string) => {
    this.moveElement(id, 1);
  }

  moveElement = (id: string, position: number) => {
    let form = Object.assign({}, this.state.form);
    let element = form.elements.filter(e => e.id === id)[0];
    const index = form.elements.indexOf(element);
    form.elements.splice(index + position, 0, form.elements.splice(index, 1)[0]);
    this.setState({ form: form });
  }

  handleTogglePanel = () => {
    this.setState({ panel: !this.state.panel });
  }

  handleAddElement = (element: any) => {
    let form = Object.assign({}, this.state.form);
    form.elements = [...form.elements, element];
    element.id = form.elements.length;
    this.setState({form: form});
  }

  handleElementEdit = (id: string) : void => {
    this.setState({
      editing: this.state.editing !== id ? id : null
    });
  }

  handleElementDestroy = (id: string) : void => {
    const form = Object.assign({}, this.state.form);
    form.elements = form.elements.filter(e => e.id !== id);
    this.setState({ form: form });
  }

  handleDisplayModeChange = (display) : void => {
    this.setState({ display: display})
  }

  render() {

    const form = this.state.form;
    const elements = form ? form.elements : [];
    const display = this.state.display;
    const panel = this.state.panel;

    return (
      <div>
        <h1>Show {this.props.routeParams.id}</h1>
        {/*<pre>{JSON.stringify(this.state.form, null, 2)}</pre>*/}

        <div className="clearfix" style={{ marginBottom: 10 }}>
            <Actions>
              <DisplayModeButtons display={display} onClick={this.handleDisplayModeChange}/>
              {" "}
              <AddElementButton panel={panel} onClick={this.handleTogglePanel}/>
            </Actions>
        </div>
        <Row>
          <Main panel={panel}>
            {elements.map((e, i) => {
              return (
                <EditorFrame
                  key={i}
                  element={e}
                  onChange={this.handleElementChange}
                  expanded={e.id === this.state.editing}
                  hidden={this.state.display == 'preview'}
                  onEdit={this.handleElementEdit}
                  onMoveUp={this.handleMoveUp}
                  onMoveDown={this.handleMoveDown}
                  onDestroy={this.handleElementDestroy}>
                  <FormElement
                    key={i}
                    {...e}
                    model={this.state.data}
                    onChange={this.handleModelChange} />
                </EditorFrame>
              )
            })}
          </Main>
          <SidePanel visible={panel}>
            <ElementPicker onElementPicked={this.handleAddElement}/>
          </SidePanel>
        </Row>
      </div>
    );

  }

}

const Row = (props: { style?: any, children?: any[] }) => (
  <div className="row" style={props.style}>
    {props.children}
  </div>
)

const Main = (props: { panel: boolean, children?: any[]}) => (
  <div className={`col-sm-${props.panel ? 8 : 12}`}>
    {props.children}
  </div>
)

const SidePanel = (props: { visible: boolean, children?: any[]}) => (
  <div className={'col-sm-4'} style={{ display: props.visible ? 'block' : 'none' }}>
    {props.children}
  </div>
)

const Actions = (props: { children?: any[] }) => (
  <div className="pull-right">
    {props.children}
  </div>
);

const AddElementButton = (props: { panel: boolean, onClick: () => void }) => {

  const handleClick = (event: any) : void => {
    event.target.blur();
    props.onClick();
  };

  return (
    <button
      className="btn btn-default"
      onClick={handleClick}>
      <i className="fa fa-plus"/>{" "}
      Add Element
    </button>
  );

}

const DisplayModeButtons = (props: { display: String, onClick: (string) => void }) => {
  const handleClick = (display: string) => {
    return (event: any) : void => {
      event.target.blur();
      props.onClick(display);
    }
  }
  const display = props.display;
  return (
    <div className="btn-group" role="group">
      <button
        type="button"
        className={"btn btn-default " + (display == 'edit' ? 'active' : '')}
        onClick={handleClick('edit')}
      >
        <i className="fa fa-edit"/>{" "}
        Edit
      </button>
      <button
        type="button"
        className={"btn btn-default " + (display == 'preview' ? 'active' : '')}
        onClick={handleClick('preview')}
      >
        <i className="fa fa-eye"/>{" "}
        Preview
      </button>
    </div>
  );
}
