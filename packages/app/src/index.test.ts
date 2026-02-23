import { test, describe } from 'node:test';
import assert from 'node:assert';
import { Application } from './index';

describe('Application', () => {
  test('should create an application', () => {
    const app = new Application();
    assert.ok(app);
  });

  test('should register forms', async () => {
    const app = new Application();
    await app.initializeForms();
    
    assert.equal(app.getFormCount(), 2);
  });

  test('should submit form', async () => {
    const app = new Application();
    await app.initializeForms();
    
    await app.submitForm('login');
    assert.ok(true);
  });
});
