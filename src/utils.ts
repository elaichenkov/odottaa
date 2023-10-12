import type { Expect } from '@playwright/test';

type CustomMatcherReturnType = {
  message: () => string;
  pass: boolean;
  name: string;
  expected?: unknown;
  actual?: unknown;
  log?: string[];
};

export type thisType = ReturnType<Expect<CustomMatcherReturnType>>;

export type Result = Pick<CustomMatcherReturnType, 'pass' | 'message' | 'name'>;

export enum Label {
  Expected = 'Expected:',
  Received = 'Received:',
  ExpectedValue = 'Expected value:',
  ReceivedValue = 'Received value:',
  ExpectedPath = 'Expected path:',
  ReceivedPath = 'Received path:',
  Text = 'text:',
  Url = 'URL:',
  StatusCode = 'status code:',
  StatusText = 'status text:',
  JSON = 'JSON:',
  Location = 'location:',
  Headers = 'headers:',
  Header = 'header name:',
  ContentType = 'content type:',
}

export const getLabel = (matcherName: string): Label => {
  switch (matcherName) {
    case 'toHaveStatusCode':
    case 'toBeForbidden':
    case 'toBeUnauthorized':
    case 'toBeNotFound':
    case 'toBeCreated':
      return Label.StatusCode;
    case 'toHaveStatusText':
      return Label.StatusText;
    case 'toContainTextContent':
      return Label.Text;
    case 'toHaveJSON':
    case 'toContainJSON':
    case 'toMatchJSON':
      return Label.JSON;
    case 'toHaveLocation':
      return Label.Location;
    case 'toHaveHeaders':
      return Label.Headers;
    case 'toHaveHeader':
      return Label.Header;
    case 'toBeRedirected':
      return Label.Url;
    case 'toHaveContentType':
      return Label.ContentType;
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
    .replaceAll(Label.ReceivedValue, `Received ${label}`)
    .replaceAll(Label.ExpectedPath, `Expected ${label}`)
    .replaceAll(Label.ReceivedPath, `Received ${label}`);
};
