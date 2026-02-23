import { test, describe } from 'node:test';
import assert from 'node:assert';
import { Button, Input } from './index';

describe('UI Components', () => {
  test('should render button component', () => {
    const btn = new Button({ label: 'click me' });
    const html = btn.render();
    assert.ok(html.includes('button'));
    assert.ok(html.includes('Click me'));
  });

  test('should handle disabled button', () => {
    const btn = new Button({ label: 'submit', disabled: true });
    assert.ok(btn.isDisabled());
  });

  test('should render input component', () => {
    const input = new Input('Enter name');
    const html = input.render();
    assert.ok(html.includes('input'));
    assert.ok(html.includes('Enter name'));
  });
});
