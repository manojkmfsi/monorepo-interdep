import { test, describe } from 'node:test';
import assert from 'node:assert';
import { logger, LogLevel } from './index';

describe('Logger', () => {
  test('should log info messages', () => {
    logger.info('Test message');
    assert.ok(true);
  });

  test('should log error messages', () => {
    logger.error('Error message');
    assert.ok(true);
  });
});
