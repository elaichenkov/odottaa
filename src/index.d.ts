import type { APIResponse } from 'playwright-core';

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      /**
       * Asserts that the response status code is equal to the expected value.
       * @example
       * const response = await request('https://example.com');
       * await expect(response).toHaveStatusCode(200);
       * @param statusCode - string The expected status code.
       * @returns Promise<void>
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
       **/
      toHaveStatusCode(statusCode: number): Promise<APIResponse>;
      /**
       * Asserts that the response status text is equal to the expected status text.
       * @example
       * const response = await request('https://example.com');
       * await expect(response).toHaveStatusText('OK');
       * @param statusText - string The expected status text.
       * @returns Promise<void>
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
       **/
      toHaveStatusText(statusText: string): Promise<APIResponse>;
      /**
       * Asserts that the response body json is equal to the expected object.
       * @example
       * const response = await request('https://example.com/data.json');
       * await expect(response).toHaveJSON({
       *  id: 1,
       *  name: 'John Doe',
       * });
       * @param json - object The expected JSON object.
       * @returns Promise<void>
       **/
      toHaveJSON(json: unknown): Promise<APIResponse>;
      /**
       * Asserts that the response body array contains the expected object.
       * @example
       * const response = await request('https://example.com/data.json');
       * await expect(response).toContainJSON({
       *  id: 1,
       * });
       * @param json - object The expected JSON object.
       * @returns Promise<void>
       **/
      toContainJSON(json: unknown): Promise<APIResponse>;
      /**
       * Asserts that the response text is equal to the expected text.
       * @example
       * const response = await request('https://example.com');
       * await expect(response).toHaveText('Hello World!');
       * @param text - string The expected text.
       * @returns Promise<void>
       **/
      toHaveText(text: string): Promise<APIResponse>;
      /**
       * Asserts that the response headers contains the expected header.
       * @example
       * const response = await request('https://example.com');
       * await expect(response).toHaveHeader({name: 'Content-Type', value: 'application/json'});
       * @param header - { name: string; value: string } The expected header.
       * @returns Promise<void>
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
       **/
      toHaveHeader(header: { name: string; value: string }): Promise<APIResponse>;
    }
  }
}
