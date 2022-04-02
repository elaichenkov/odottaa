import type { APIResponse } from 'playwright-core';

declare global {
  namespace PlaywrightTest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      /**
       * Asserts that the response status code is equal to the expected status code
       * @example
       * const response = await request.get('https://example.com');
       *
       * await expect(response).toHaveStatusCode(200);
       * @param statusCode - string The expected status code.
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
       **/
      toHaveStatusCode(statusCode: number): Promise<APIResponse>;
      /**
       * Asserts that the response status text is equal to the expected status text
       * @example
       * const response = await request.get('https://example.com');
       *
       * await expect(response).toHaveStatusText('OK');
       * @param statusText - string The expected status text.
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
       **/
      toHaveStatusText(statusText: string): Promise<APIResponse>;
      /**
       * Asserts that the response body json is equal to the all properties of object instances (also known as "deep" equality)
       * @example
       * const response = await request.get('https://example.com/data.json');
       *
       * await expect(response).toHaveJSON({
       *  id: 1,
       *  name: 'John Doe',
       * });
       * @param object - unknown The expected JSON object.
       **/
      toHaveJSON(object: unknown): Promise<APIResponse>;
      /**
       * Asserts that the response body json matches a subset of the properties of an object.
       * It will match received objects with properties that are not in the expected object.
       * @example
       * const response = await request.get('https://example.com/data.json');
       *
       * await expect(response).toMatchJSON({
       *  name: 'John Doe',
       * });
       * @param object - object The expected object.
       **/
      toMatchJSON(object: object): Promise<APIResponse>;
      /**
       * Asserts that the response body array contains that an item with a specific structure and values is contained in an array.
       *
       * For testing the items in the array, this matcher recursively checks the equality of all fields, rather than checking for object identity..
       * @example
       * const response = await request.get('https://example.com/data.json');
       *
       * await expect(response).toContainJSON({
       *  id: 1,
       * });
       * @param object - object The expected JSON object.
       **/
      toContainJSON(object: unknown): Promise<APIResponse>;
      /**
       * Asserts that the response text contains the expected text
       * @example
       * const response = await request.get('https://example.com');
       *
       * await expect(response).toHaveText('Hello World!');
       * @param text - string The expected text.
       **/
      toContainTextContent(text: string): Promise<APIResponse>;
      /**
       * Asserts that the response headers contains the expected header.
       * @example
       * const response = await request.get('https://example.com');
       *
       * await expect(response).toHaveHeaders({ 'content-length': '22' });
       * @param header - { [key: string]: string } The expected header.
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
       **/
      toHaveHeaders(header: object): Promise<APIResponse>;
      /**
       * Asserts that the response headers contains the expected header name.
       * @example
       * const response = await request.get('https://example.com');
       *
       * // Asserts that the response headers contains the header 'content-length'
       * await expect(response).toHaveHeaderName('content-length');
       *
       * // Asserts that the response headers contains the header 'content-length' with value '22'
       * await expect(response).toHaveHeaderName('content-length', '22');
       * @param name - string The expected header name.
       * @param value - string The expected header value.
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
       **/
      toHaveHeader(name: string, value?: string): Promise<APIResponse>;
      /**
       * Asserts that the response headers content type is equal to the expected type.
       * @example
       * const response = await request.get('https://example.com');
       *
       * await expect(response).toHaveContentType('text/html');
       * @param contentType - string The expected header.
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
       **/
      toHaveContentType(contentType: string): Promise<APIResponse>;
      /**
       * Asserts that the response location is equal to the expected location.
       * @example
       * const response = await request.get('https://example.com/home');
       *
       * await expect(response).toHaveLocation('/home');
       * @param location - string The expected header.
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
       **/
      toHaveLocation(location: string): Promise<APIResponse>;
      /**
       * Asserts that the response status code is 201.
       * @example
       * const response = await request.post('https://example.com/create');
       *
       * await expect(response).toBeCreated();
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
       **/
      toBeCreated(): Promise<APIResponse>;
      /**
       * Asserts that the response status code is 401.
       * @example
       * const response = await request.post('https://example.com/create');
       *
       * await expect(response).toBeUnauthorized();
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
       **/
      toBeUnauthorized(): Promise<APIResponse>;
      /**
       * Asserts that the response status code is 403.
       * @example
       * const response = await request.post('https://example.com/create');
       *
       * await expect(response).toBeForbidden();
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
       **/
      toBeForbidden(): Promise<APIResponse>;
      /**
       * Asserts that the response status code is 404.
       * @example
       * const response = await request.get('https://example.com/list');
       *
       * await expect(response).toBeNotFound();
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
       **/
      toBeNotFound(): Promise<APIResponse>;
      /**
       * Asserts that the response url is being redirected to the expected url
       * @example
       * const response = await request.get('https://example.com/dashboard');
       *
       * await expect(response).toBeRedirected('https://example.com/auth/login');
       * @param to - string The expected header.
       **/
      toBeRedirected(to: string): Promise<APIResponse>;
    }
  }
}
