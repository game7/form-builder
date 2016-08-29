import * as React from 'react';
import { Store, IForm } from './data';
import { Link } from 'react-router';

interface IProps {

}

interface IState {
  forms: IForm[];
}

class List extends React.Component<IProps, IState>
            implements React.ComponentLifecycle<IProps, IState> {

  constructor() {
    super();
    this.state = {
      forms: []
    };
  }

  componentDidMount() {
    Store.all().then((forms) => {
      this.setState({
        forms: forms
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Forms</h1>
        <table className="table table-bordered">
          <tbody>
            {this.state.forms.map((form, i) => Form(form, i))}
          </tbody>
        </table>
      </div>
    );
  }

}

function Form(form: IForm, index: number) {
  return(
    <tr key={index}>
      <td>{form.name}</td>
      <td>
        <Link to={`/forms/${form.id}`}>Show</Link>
      </td>
    </tr>
  )
}

export default List;
