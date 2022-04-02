import { test, expect } from '@playwright/test';

const statusMap = new Map([
  [201, 'toBeCreated'],
  [401, 'toBeUnauthorized'],
  [403, 'toBeForbidden'],
  [404, 'toBeNotFound'],
]);

test.describe('matchers', () => {
  statusMap.forEach((method, status) => {
    test(`verify ${method}`, async ({ request }) => {
      const response = await request.get(`${status}`);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await expect(response)[method]();
    });
  });

  test('verify toHaveStatusCode', async ({ request }) => {
    const response = await request.get('/404');

    await expect(response).toHaveStatusCode(404);
  });

  test('fail toHaveStatusCode', async ({ request }) => {
    test.fail();

    const response = await request.get('/404');

    await expect(response).toHaveStatusCode(401);
  });

  test('verify toHaveStatusText', async ({ request }) => {
    const response = await request.get('/404');

    await expect(response).toHaveStatusText('Not Found');
  });

  test('verify toHaveJSON array of objects', async ({ request }) => {
    const response = await request.get('/data/array');

    await expect(response).toHaveJSON([
      { age: 30, name: 'John' },
      { age: 19, name: 'Adam' },
    ]);
  });

  test('verify toMatchJSON object', async ({ request }) => {
    const response = await request.get('/data/object');

    await expect(response).toMatchJSON({ age: 30, name: 'John' });
  });

  test('verify toMatchJSON nested object', async ({ request }) => {
    const desiredHouse = {
      bath: true,
      kitchen: {
        amenities: ['oven', 'stove', 'washer'],
        wallColor: expect.stringMatching(/white|yellow/),
      },
    };
    const response = await request.get('/data/object/nested');

    await expect(response).toMatchJSON(desiredHouse);
  });

  test('verify toHaveJSON empty array', async ({ request }) => {
    const response = await request.get('/data/array/empty');

    await expect(response).toHaveJSON([]);
  });

  test('verify toHaveJSON object', async ({ request }) => {
    const response = await request.get('/data/object');

    await expect(response).toHaveJSON({ age: 30, name: 'John' });
  });

  test('verify toContainJSON object', async ({ request }) => {
    const response = await request.get('/data/array');

    await expect(response).toContainJSON({ age: 30, name: 'John' });
  });

  test('verify toHaveText exact', async ({ request }) => {
    const response = await request.get('/');

    await expect(response).toContainTextContent('<h1>Hello, World!</h1>');
  });

  test('verify toHaveText contain', async ({ request }) => {
    const response = await request.get('/');

    await expect(response).toContainTextContent('Hello');
  });

  test('verify toHaveHeaders', async ({ request }) => {
    const response = await request.get('/');
    await expect(response).toHaveHeaders({ 'content-length': '22' });
  });

  test('verify toHaveHeaders two properties', async ({ request }) => {
    const response = await request.get('/');
    await expect(response).toHaveHeaders({ 'content-length': '22', 'content-type': 'text/html' });
  });

  test('verify toHaveHeader key', async ({ request }) => {
    const response = await request.get('/');
    await expect(response).toHaveHeader('content-length');
  });

  test('verify toHaveHeader key & value', async ({ request }) => {
    const response = await request.get('/');
    await expect(response).toHaveHeader('content-length', '22');
  });

  test('verify toHaveContentType', async ({ request }) => {
    const response = await request.get('/');
    await expect(response).toHaveContentType('text/html');
  });

  test('verify toHaveLocation', async ({ request, baseURL }) => {
    const response = await request.get('/');
    await expect(response).toHaveLocation(baseURL!);
  });

  test('verify toBeRedirected', async ({ request, baseURL }) => {
    const response = await request.get('/redirect');
    await expect(response).toBeRedirected(`${baseURL}demo`);
  });
});
