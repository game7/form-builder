import * as React from 'react';

function isString(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object String]';
}

export interface Rule<TObject, TValue> {
  property: string;
  condition: (value: TValue, object?: TObject) => boolean|Promise<boolean>;
  config: Object;
  when: { (object: TObject): boolean }|null;
  messageKey: string;
  message: string|null;
  tag?: string;
}

class FluentRule<TObject, TValue> {

  private rule: Rule<TObject, TValue>;

  constructor(
    property: string,
    condition: (value, object?) => boolean|Promise<boolean>,
    config: Object = {},
    private validator: Validator<TObject>,
    private fluentEnsure: FluentEnsure<TObject>,
    private fluentRules: FluentRules<TObject, TValue>
  ) {
    this.rule = {
      property,
      condition,
      config,
      when: (object) => true,
      messageKey: 'default',
      message: null
    };
    this.validator.rules.push(this.rule);
  }

  withMessage(message: string) {
    this.rule.messageKey = 'custom';
    this.rule.message = message;
    return this;
  }

  withMessageKey(key: string) {
    this.rule.messageKey = key;
    this.rule.message = null;
    return this;
  }

  when(condition: (object: TObject) => boolean) {
    this.rule.when = condition;
    return this;
  }

  tag(tag: string) {
    this.rule.tag = tag;
    return this;
  }

}

class FluentRules<TObject, TValue> {
  constructor(
    private validator: Validator<TObject>,
    private ensure: FluentEnsure<TObject>,
    private property: string
  ) {}

  satisfies(condition: (value, object?) => boolean|Promise<boolean>, config?: Object) {
    return new FluentRule(this.property, condition, config, this.validator, this.ensure, this);
  }

  required() {
    return this.satisfies(
      value =>
        value !== null
        && value !== undefined
        && !(isString(value) && !/\S/.test(value))
    ).withMessageKey('required');
  }

  matches(regex: RegExp) {
    return this.satisfies(
      value =>
        value === null
        || value === undefined
        || (value).length === 0
        || regex.test(value)
      ).withMessageKey('matches');
  }

  email() {
    return this.matches(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/)
      .withMessageKey('email');
  }

  minLength(length: number) {
    return this.satisfies(
      (value: any) =>
        value === null
        || value === undefined
        || value.length === 0
        || value.length >= length, { length }
      )
      .withMessageKey('minLength');
  }

  maxLength(length: number) {
    return this.satisfies(
      (value: any) =>
        value === null
        || value === undefined
        || value.length === 0
        || value.length <= length, { length }
      )
      .withMessageKey('maxLength');
  }

}

class FluentEnsure<TObject> {

  constructor(private validator: Validator<TObject>) {}

  ensure<TValue>(property: string) {
    return new FluentRules(this.validator, this, property)
  }

}

const messages = {
  required: 'Can\'t be blank',
  email: 'Must be a valid email address'
}

function message(rule) {
  return rule.message || messages[rule.messageKey] || rule.messageKey;
}

export class Validator<TObject> {

  public rules: Rule<TObject, any>[] = []

  ensure<TValue>(property: string) {
      return new FluentEnsure(this).ensure(property);
  }

  validate(model: TObject): string[] {
    return this.rules.filter(rule => rule.when(model))
                     .filter(rule => !rule.condition(model[rule.property]))
                     .map(rule => message(rule));
  }

}
