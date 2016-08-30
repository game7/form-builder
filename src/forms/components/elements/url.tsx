import * as React from 'react';
import { Component } from 'react';
import ShortText from './short-text';

export default class Email extends ShortText {

  constructor() {
    super();
    this.validator.ensure('value').url();
  }
}
