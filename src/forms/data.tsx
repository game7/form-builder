const _forms= [
  {
    id: '1',
    name: 'form 1',
    elements: [
      {
        id: '1',
        type: 'short-text',
        property: 'first_name',
        label: 'First Name',
        required: true
      },
      {
        id: '2',
        type: 'short-text',
        label: 'Last Name',
        property: 'last_name',
        required: true
      },
      {
        id: '3',
        type: 'multiple-choice',
        label: 'Favorite Color',
        property: 'favorite_color',
        required: true,
        options: "red\ngreen\nblue"
      }
    ]
  },
  {
    id: '2',
    name: 'form 2',
    elements: []
  }
]


export class Store {

  static all(): Promise<IForm[]> {
    return Promise.resolve(_forms);
  }

  static find(id): Promise<IForm> {
    return Store.all().then((forms) => {
      return forms.filter((form) => (form.id === id))[0];
    })
  }

}

export interface IForm {
  id: string,
  name: string,
  elements: IFormElement[]
}

export interface IFormElement {
  id: string,
  type: string
}
