import { Label } from './../src/utils';
import { test, expect } from '@playwright/test';
import playwrightApiMatchers from '../src/index';
import { getLabel } from '../src/utils';

test.describe('utils', () => {
  Object.keys(playwrightApiMatchers).forEach((matcherName) => {
    test(`getLabel(${matcherName})`, () => {
      const label = getLabel(matcherName);

      expect(typeof label).toBe('string');
      expect(label).not.toBe(Label.Expected);
    });
  });

  test('normalize', () => {
    test.skip(true, 'TODO: add tests for the method');
  });
});
