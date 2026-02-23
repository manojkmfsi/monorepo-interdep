import { test, describe } from 'node:test';
import assert from 'node:assert';
import { Form } from './index';

describe('Form', () => {
  test('should create a form with fields', () => {
    const form = new Form('http://localhost:3000');
    form.addField('email', 'Enter email');
    form.addField('password', 'Enter password');

    const fields = form.getFields();
    assert.ok(fields.email);
    assert.ok(fields.password);
  });

  test('should set field values', () => {
    const form = new Form('http://localhost:3000');
    form.addField('name', 'Name');
    form.setFieldValue('name', 'John Doe');

    const fields = form.getFields();
    assert.equal(fields.name, 'John Doe');
  });

  test('should render form HTML', () => {
    const form = new Form('http://localhost:3000');
    form.addField('email', 'Email');
    
    const html = form.render();
    assert.ok(html.includes('<form>'));
    assert.ok(html.includes('</form>'));
    assert.ok(html.includes('button'));
  });

  test('should submit form data', async () => {
    const form = new Form('http://localhost:3000');
    form.addField('email', 'test@example.com');
    
    await form.submit();
    assert.ok(true); // If no errors, test passes
  });
});
