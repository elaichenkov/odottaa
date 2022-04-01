import { test, expect } from '@playwright/test';

test.describe('matchers', () => {
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

    await expect(response).toHaveStatusText('Not found');
  });

  test('verify toHaveJSON array of objects', async ({ request }) => {
    const response = await request.get('/data/array');

    await expect(response).toHaveJSON([
      { age: 30, name: 'John' },
      { age: 19, name: 'Adam' },
    ]);
  });

  test('verify toHaveJSON empty array', async ({ request }) => {
    const response = await request.get('/data/array/empty');

    await expect(response).toHaveJSON([]);
  });

  test('verify toHaveJSON object', async ({ request }) => {
    const response = await request.get('/data/object');

    await expect(response).toHaveJSON({ age: 30, name: 'John' });
  });

  test('fail toHaveJSON null', async ({ request }) => {
    test.fail();
    const response = await request.get('/da');

    await expect(response).toHaveJSON(null);
  });

  test('verify toContainJSON object', async ({ request }) => {
    const response = await request.get('/data/array');

    await expect(response).toContainJSON({ age: 30, name: 'John' });
  });

  test('verify toHaveText exact', async ({ request }) => {
    const response = await request.get('/');

    await expect(response).toHaveText('<h1>Hello, World!</h1>');
  });

  test('verify toHaveText contain', async ({ request }) => {
    const response = await request.get('/');

    await expect(response).toHaveText('Hello');
  });

  test('verify toHaveHeader', async ({ request }) => {
    const response = await request.get('/');
    await expect(response).toHaveHeader({ name: 'Content-Length', value: '22' });
  });
});
