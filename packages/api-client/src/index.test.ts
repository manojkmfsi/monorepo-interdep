import { test, describe } from 'node:test';
import assert from 'node:assert';
import { ApiClient } from './index';

describe('ApiClient', () => {
  test('should make GET request', async () => {
    const client = new ApiClient('http://localhost:3000');
    const response = await client.get('/users');
    
    assert.equal(response.status, 200);
    assert.ok(response.data);
    assert.ok(response.timestamp);
  });

  test('should make POST request', async () => {
    const client = new ApiClient('http://localhost:3000');
    const response = await client.post('/users', { name: 'John' });
    
    assert.equal(response.status, 200);
    assert.ok(response.timestamp);
  });
});
