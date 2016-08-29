

interface IAttribute {
  id?: string,
  type: string,
  label?: string,
  property: string,
  required?: boolean,
  text?: string
};

interface IAttributes {
  label: IAttribute,
  property: IAttribute,
  required: IAttribute,
  options: IAttribute,
  text: IAttribute,
  multiple: IAttribute,
  randomize: IAttribute
}

let attr: IAttributes = {} as IAttributes;
let attributes: IAttributes = attr;

attr.label = {
  id: 'label',
  type: 'short-text',
  label: 'Label',
  property: 'label'
}

attr.property = {
  id: 'property',
  type: 'short-text',
  label: 'Property',
  property: 'property',
  required: true
};

attr.required = {
  id: 'required',
  type: 'checkbox',
  property: 'required',
  label: null,
  text: 'Required'
};

attr.options = {
  id: 'options',
  type: 'long-text',
  property: 'options',
  label: 'Choices'
};

attr.multiple = {
  id: 'multiple',
  type: 'checkbox',
  property: 'multiple',
  label: null,
  text: 'Multiple selections'
};

attr.randomize = {
  id: 'randomize',
  type: 'checkbox',
  property: 'randomize',
  label: null,
  text: 'Randomize'
};

attr.text = {
  id: 'text',
  label: 'Text',
  type: 'short-text',
  property: 'text'
};


let tmpl: { [id: string]: IAttribute[] } = {};
let templates: { [id: string]: IAttribute[] } = tmpl;

tmpl['text-field'] = [
  attr.property,
  attr.label,
  attr.required,
];

let el: { [id: string]: IAttribute[] } = {};
let elements: { [id: string]: IAttribute[] } = el;

el['short-text'] = templates['text-field'];
el['long-text'] = templates['text-field'];

el['checkbox'] = [
  attr.label,
  attr.text,
  attr.required
];
el['statement'] = [ attr.text ];

el['multiple-choice'] = [
  attr.property,
  attr.label,
  attr.options,
  attr.required,
  attr.multiple,
  attr.randomize
];

export default elements;
