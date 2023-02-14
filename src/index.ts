import type { APIResponse } from '@playwright/test';
// @ts-expect-error - no types
import jestExpect from 'expect/build/matchers';
import { normalize, thisType, Result } from './utils';

const playwrightApiMatchers = {
  async toHaveStatusCode(this: thisType, response: APIResponse, expected: number) {
    const expectedMatcherName = 'toHaveStatusCode';
    const received = response.status();
    const {
      name: originalMatcherName,
      message: originalMessage,
      pass,
    } = jestExpect.toBe.call(this, received, expected) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toHaveStatusText(this: thisType, response: APIResponse, expected: string) {
    const expectedMatcherName = 'toHaveStatusText';
    const received = response.statusText();

    const {
      name: originalMatcherName,
      message: originalMessage,
      pass,
    } = jestExpect.toBe.call(this, received, expected) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toHaveJSON(this: thisType, response: APIResponse, expected: unknown) {
    const expectedMatcherName = 'toHaveJSON';
    const received = await response.json();

    const {
      name: originalMatcherName,
      message: originalMessage,
      pass,
    } = jestExpect.toEqual.call({ ...this, customTesters: [] }, received, expected) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toContainJSON(this: thisType, response: APIResponse, expected: unknown) {
    const originalMatcherName = 'toContainEqual';
    const expectedMatcherName = 'toContainJSON';
    const received = await response.json();

    const { message: originalMessage, pass } = jestExpect.toContainEqual.call(
      { ...this, customTesters: [] },
      received,
      expected,
    ) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toMatchJSON(this: thisType, response: APIResponse, expected: object) {
    const originalMatcherName = 'toMatchObject';
    const expectedMatcherName = 'toMatchJSON';
    const received = await response.json();

    const { message: originalMessage, pass } = jestExpect.toMatchObject.call(
      { ...this, customTesters: [] },
      received,
      expected,
    ) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toContainTextContent(this: thisType, response: APIResponse, expected: object) {
    const expectedMatcherName = 'toContainTextContent';
    const received = await response.text();

    const {
      name: originalMatcherName,
      message: originalMessage,
      pass,
    } = jestExpect.toContain.call({ ...this, customTesters: [] }, received, expected) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toHaveHeaders(this: thisType, response: APIResponse, expected: object) {
    const originalMatcherName = 'toMatchObject';
    const expectedMatcherName = 'toHaveHeaders';
    const received = response.headers();

    const { message: originalMessage, pass } = jestExpect.toMatchObject.call(
      { ...this, customTesters: [] },
      received,
      expected,
    ) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toHaveHeader(this: thisType, response: APIResponse, expectedKey: string, expectedValue?: string) {
    const originalMatcherName = 'toHaveProperty';
    const expectedMatcherName = 'toHaveHeader';
    const received = response.headers();
    const expected = expectedValue ? [expectedKey, expectedValue] : [expectedKey];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { message: originalMessage, pass } = jestExpect.toHaveProperty.call(
      { ...this, customTesters: [] },
      received,
      ...expected,
    ) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toHaveContentType(this: thisType, response: APIResponse, expected: string) {
    const expectedMatcherName = 'toHaveContentType';
    const received = response.headers();

    const {
      name: originalMatcherName,
      message: originalMessage,
      pass,
    } = jestExpect.toBe.call(this, received['content-type'], expected) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toHaveLocation(this: thisType, response: APIResponse, expected: string) {
    const expectedMatcherName = 'toHaveLocation';
    const received = response.headers();

    const {
      name: originalMatcherName,
      message: originalMessage,
      pass,
    } = jestExpect.toBe.call(this, received['location'], expected) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toBeCreated(this: thisType, response: APIResponse) {
    const expectedMatcherName = 'toBeCreated';
    const expected = 201;
    const received = response.status();

    const {
      name: originalMatcherName,
      message: originalMessage,
      pass,
    } = jestExpect.toBe.call(this, received, expected) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toBeUnauthorized(this: thisType, response: APIResponse) {
    const expectedMatcherName = 'toBeUnauthorized';
    const expected = 401;
    const received = response.status();

    const {
      name: originalMatcherName,
      message: originalMessage,
      pass,
    } = jestExpect.toBe.call(this, received, expected) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toBeForbidden(this: thisType, response: APIResponse) {
    const expectedMatcherName = 'toBeForbidden';
    const expected = 403;
    const received = response.status();

    const {
      name: originalMatcherName,
      message: originalMessage,
      pass,
    } = jestExpect.toBe.call(this, received, expected) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toBeNotFound(this: thisType, response: APIResponse) {
    const expectedMatcherName = 'toBeNotFound';
    const expected = 404;
    const received = response.status();

    const {
      name: originalMatcherName,
      message: originalMessage,
      pass,
    } = jestExpect.toBe.call(this, received, expected) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
  async toBeRedirected(this: thisType, response: APIResponse, expected: string) {
    const expectedMatcherName = 'toBeRedirected';
    const received = response.url();
    const {
      name: originalMatcherName,
      message: originalMessage,
      pass,
    } = jestExpect.toBe.call(this, received, expected) as Result;

    const message = () => normalize(originalMessage(), originalMatcherName, expectedMatcherName);

    return { pass, message };
  },
};

export default playwrightApiMatchers;
