import type { APIResponse, Expect } from '@playwright/test';
import { getType } from 'jest-get-type';
import {
  DIM_COLOR,
  INVERTED_COLOR,
  matcherHint,
  MatcherHintOptions,
  printExpected,
  printReceived,
  RECEIVED_COLOR,
  matcherErrorMessage,
  printWithType,
  printDiffOrStringify,
  stringify,
  getLabelPrinter,
} from 'jest-matcher-utils';

const EXPECTED_LABEL = 'Expected';
const RECEIVED_LABEL = 'Received';

interface APIResponseEx extends APIResponse {
  _fetchLog(): Promise<string[]>;
}

const callLogText = (log: string[] | undefined): string => {
  if (!log) return '';
  return `
Call log:
  ${DIM_COLOR('- ' + (log || []).join('\n  - '))}
`;
};

const playwrightApiMatchers = {
  async toHaveStatusCode(this: ReturnType<Expect['getState']>, response: APIResponseEx, expected: number) {
    const matcherName = 'toHaveStatusCode';
    const { isNot, promise } = this;
    const log = isNot === response.ok() ? await response._fetchLog() : [];
    const received = response.status();

    const options: MatcherHintOptions = {
      isNot,
      promise,
    };

    const pass = received === expected;
    const message = () =>
      matcherHint(matcherName, undefined, undefined, options) +
      '\n\n' +
      `Expected status code: ${isNot ? ' not' : ''}${printExpected(expected)}\n` +
      `Received status code: ${isNot ? '    ' : ''}${printReceived(received)}` +
      callLogText(log);

    return { message, pass };
  },

  async toHaveStatusText(this: ReturnType<Expect['getState']>, response: APIResponseEx, expected: string) {
    const matcherName = 'toHaveStatusCode';
    const { isNot, promise } = this;
    const log = isNot === response.ok() ? await response._fetchLog() : [];
    const received = response.statusText();

    const options: MatcherHintOptions = {
      isNot,
      promise,
    };

    const pass = received.toLowerCase() === expected.toLowerCase();
    const message = () =>
      matcherHint(matcherName, undefined, undefined, options) +
      '\n\n' +
      `Expected status text: ${isNot ? ' not' : ''}${printExpected(expected)}\n` +
      `Received status text: ${isNot ? '    ' : ''}${printReceived(received)}` +
      callLogText(log);

    return { message, pass };
  },
  async toHaveJSON(this: ReturnType<Expect['getState']>, response: APIResponseEx, expected: unknown) {
    const matcherName = 'toHaveJSON';
    const { isNot, promise } = this;
    const options: MatcherHintOptions = {
      comment: 'deep equality',
      isNot,
      promise,
    };
    const log = isNot === response.ok() ? await response._fetchLog() : [];
    const received = await response.json();

    if (received == null) {
      throw new Error(
        matcherErrorMessage(
          matcherHint(matcherName, undefined, undefined, options),
          `${RECEIVED_COLOR('received')} value must not be null nor undefined`,
          printWithType('Received', received, printReceived) + callLogText(log),
        ),
      );
    }

    const pass = this.equals(received, expected, [this.utils.iterableEquality]);
    const message = pass
      ? () =>
          matcherHint(matcherName, undefined, undefined, options) +
          '\n\n' +
          `Expected: not ${printExpected(expected)}\n` +
          (stringify(expected) !== stringify(received) ? `Received:     ${printReceived(received)}` : '')
      : () =>
          matcherHint(matcherName, undefined, undefined, options) +
          '\n\n' +
          printDiffOrStringify(expected, received, EXPECTED_LABEL, RECEIVED_LABEL, true);

    return { actual: received, expected, message, name: matcherName, pass };
  },
  async toContainJSON(this: ReturnType<Expect['getState']>, response: APIResponseEx, expected: unknown) {
    const matcherName = 'toContainJSON';
    const { isNot, promise, utils } = this;
    const options: MatcherHintOptions = {
      comment: 'deep equality',
      isNot,
      promise,
    };
    const log = isNot === response.ok() ? await response._fetchLog() : [];
    const received = await response.json();

    if (received == null) {
      throw new Error(
        matcherErrorMessage(
          matcherHint(matcherName, undefined, undefined, options),
          `${RECEIVED_COLOR('received')} value must not be null nor undefined`,
          printWithType('Received', received, printReceived) + callLogText(log),
        ),
      );
    }

    const printReceivedArrayContainExpectedItem = (received: Array<unknown>, index: number): string =>
      RECEIVED_COLOR(
        '[' +
          received
            .map((item, i) => {
              const stringified = stringify(item);
              return i === index ? INVERTED_COLOR(stringified) : stringified;
            })
            .join(', ') +
          ']',
      );

    const index = Array.from(received).findIndex((item) => this.equals(item, expected, [utils.iterableEquality]));
    const pass = index !== -1;
    const message = () => {
      const labelExpected = 'Expected value';
      console.log('TYPE: ', Array.isArray(received));
      const labelReceived = `Received ${getType(received)}`;
      const printLabel = getLabelPrinter(labelExpected, labelReceived);

      return (
        matcherHint(matcherName, undefined, undefined, options) +
        '\n\n' +
        `${printLabel(labelExpected)}${isNot ? 'not ' : ''}${printExpected(expected)}\n` +
        `${printLabel(labelReceived)}${isNot ? '    ' : ''}${
          isNot && Array.isArray(received) ? printReceivedArrayContainExpectedItem(received, index) : printReceived(received)
        }`
      );
    };

    return { message, pass };
  },
  async toHaveText(this: ReturnType<Expect['getState']>, response: APIResponseEx, expected: string) {
    const matcherName = 'toHaveText';
    const { isNot, promise } = this;
    const log = isNot === response.ok() ? await response._fetchLog() : [];
    const received = await response.text();

    const options: MatcherHintOptions = {
      isNot,
      promise,
    };

    const pass = received.includes(expected);
    const message = () =>
      matcherHint(matcherName, undefined, undefined, options) +
      '\n\n' +
      printDiffOrStringify(expected, received, EXPECTED_LABEL, RECEIVED_LABEL, true) +
      callLogText(log);

    return { message, pass };
  },
  async toHaveHeader(this: ReturnType<Expect['getState']>, response: APIResponseEx, expected: unknown) {
    const matcherName = 'toHaveHeader';
    const { isNot, promise, utils } = this;
    const options: MatcherHintOptions = {
      comment: 'deep equality',
      isNot,
      promise,
    };
    const log = isNot === response.ok() ? await response._fetchLog() : [];
    const received = response.headersArray();

    if (received == null) {
      throw new Error(
        matcherErrorMessage(
          matcherHint(matcherName, undefined, undefined, options),
          `${RECEIVED_COLOR('received')} value must not be null nor undefined`,
          printWithType('Received', received, printReceived) + callLogText(log),
        ),
      );
    }

    const printReceivedArrayContainExpectedItem = (received: Array<unknown>, index: number): string =>
      RECEIVED_COLOR(
        '[' +
          received
            .map((item, i) => {
              const stringified = stringify(item);
              return i === index ? INVERTED_COLOR(stringified) : stringified;
            })
            .join(', ') +
          ']',
      );

    const index = Array.from(received).findIndex((item) => this.equals(item, expected, [utils.iterableEquality]));
    const pass = index !== -1;
    const message = () => {
      const labelExpected = 'Expected value';
      console.log('TYPE: ', Array.isArray(received));
      const labelReceived = `Received ${getType(received)}`;
      const printLabel = getLabelPrinter(labelExpected, labelReceived);

      return (
        matcherHint(matcherName, undefined, undefined, options) +
        '\n\n' +
        `${printLabel(labelExpected)}${isNot ? 'not ' : ''}${printExpected(expected)}\n` +
        `${printLabel(labelReceived)}${isNot ? '    ' : ''}${
          isNot && Array.isArray(received) ? printReceivedArrayContainExpectedItem(received, index) : printReceived(received)
        }`
      );
    };

    return { message, pass };
  },
};

export default playwrightApiMatchers;
