import type { Expect } from '@playwright/test';

export type thisType = ReturnType<Expect['getState']>;

export interface Result {
  pass: boolean;
  message: () => string;
  name: string;
}

export enum Label {
  Expected = 'Expected:',
  Received = 'Received:',
  ExpectedValue = 'Expected value:',
  ReceivedValue = 'Received value:',
  Text = 'text:',
  Url = 'URL:',
  StatusCode = 'status code:',
  StatusText = 'status text:',
  JSON = 'JSON:',
  Location = 'location:',
  Header = 'header:',
  HeaderName = 'header name:',
}

const getLabel = (matcherName: string): Label => {
  switch (matcherName) {
    case 'toHaveStatusCode':
    case 'toBeForbidden':
    case 'toBeUnauthorized':
    case 'toBeNotFound':
      return Label.StatusCode;
    case 'toHaveStatusText':
      return Label.StatusText;
    case 'toHaveTextContent':
      return Label.Text;
    case 'toHaveJSON':
    case 'toContainJSON':
    case 'toMatchJSON':
      return Label.JSON;
    case 'toHaveLocation':
      return Label.Location;
    case 'toHaveHeader':
      return Label.Header;
    case 'toHaveHeaderName':
      return Label.HeaderName;
    case 'toBeRedirected':
      return Label.Url;
    default: {
      return Label.Expected;
    }
  }
};

export const normalize = (message: string, originalMatcherName: string, expectedMatcherName: string): string => {
  const label = getLabel(expectedMatcherName);

  return message
    .replaceAll(originalMatcherName, expectedMatcherName)
    .replaceAll(Label.Expected, `Expected ${label}`)
    .replaceAll(Label.ExpectedValue, `Expected ${label}`)
    .replaceAll(Label.Received, `Received ${label}`)
    .replaceAll(Label.ReceivedValue, `Received ${label}`);
};
