import { test, describe } from 'node:test';
import assert from 'node:assert';
import { capitalize, formatDate, delay } from './index';

describe('Utils', () => {
  test('should capitalize strings', () => {
    assert.equal(capitalize('hello'), 'Hello');
  });

  test('should format dates', () => {
    const date = new Date('2024-01-15');
    assert.equal(formatDate(date), '2024-01-15');
  });

  test('should delay execution', async () => {
    const start = Date.now();
    await delay(10);
    const elapsed = Date.now() - start;
    assert.ok(elapsed >= 10);
  });
});
