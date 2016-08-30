import * as React           from 'react'
import { Component }        from 'react';
import Statement            from './statement';
import ShortText            from './short-text';
import LongText             from './long-text';
import Checkbox             from './checkbox';
import MultipleChoice       from './multiple-choice';
import Email                from './email';
import Url                  from './url';

export default function FormElement(props: any):JSX.Element {
  switch(props.type) {
    case 'statement':
      return <Statement {...props}/>;
    case 'short-text':
      return <ShortText {...props}/>;
    case 'long-text':
      return <LongText {...props}/>;
    case 'checkbox':
      return <Checkbox {...props}/>;
    case 'multiple-choice':
      return <MultipleChoice {...props}/>
    case 'email':
      return <Email {...props}/>
    case 'url':
      return <Url {...props}/>
    default:
      return null;
  }
}
