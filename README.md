[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://vshymanskyy.github.io/StandWithUkraine)

<div align="center">
<h1 align="center">odottaa</h1>

<a href="https://www.joypixels.com/profiles/emoji/1f9a5">
  <img
    height="80"
    width="80"
    alt="sloth"
    src="./assets/sloth.png"
  />
</a>

<p>Custom playwright matchers to test the state of the API response</p>

</div>

---
[![test](https://github.com/elaichenkov/odottaa/actions/workflows/tests.yml/badge.svg)](https://github.com/elaichenkov/odottaa/actions/workflows/tests.yml)
[![NPM version](https://img.shields.io/npm/v/odottaa.svg?style=flat&color=red)](https://www.npmjs.com/package/odottaa)
[![monthly downloads](https://img.shields.io/npm/dm/odottaa.svg?style=flat&color=orange&label=monthly%20downloads)](https://www.npmjs.com/package/odottaa)
[![downloads all time](https://img.shields.io/npm/dt/odottaa.svg?style=flat&color=yellow&label=lifetime%20downloads)](https://www.npmjs.com/package/odottaa)
[![commits](https://img.shields.io/github/commit-activity/y/elaichenkov/playwright-expect.svg?style=flat&color=purple)](https://github.com/elaichenkov/odottaa/commits/main)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat&color=blue)](LICENSE)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [JavaScript](#javascript)
- [API](#api)
  - [toHaveStatusCode](#tohavestatuscode)
  - [toHaveStatusText](#tohavestatustext)
  - [toBeCreated](#tobecreated)
  - [toBeUnauthorized](#tobeunauthorized)
  - [toBeForbidden](#tobeforbidden)
  - [toBeNotFound](#tobenotfound)
  - [toHaveJSON](#tohavejson)
  - [toContainJSON](#tocontainjson)
  - [toMatchJSON](#tomatchjson)
  - [toHaveHeader](#tohaveheader)
  - [toHaveHeaders](#tohaveheaders)
  - [toHaveContentType](#tohavecontenttype)
  - [toContainTextContent](#tocontaintextcontent)
  - [toHaveLocation](#tohavelocation)
  - [toBeRedirected](#toberedirected)
- [Author](#author)
- [License](#license)

## Installation

This module is distributed via [npm](https://npmjs.com/) which is bundled with [node](https://nodejs.org/) and
should be installed as one of your project's `devDependencies`:

```bash
npm i -D odottaa
```

## Usage

1. Import `odottaa` module
2. Extend expect with custom API matchers

```typescript
// 1. In your playwright.config.ts
import { expect } from '@playwright/test';
import playwrightApiMatchers from 'odottaa';

// 2. extend expect with custom API matchers
expect.extend(playwrightApiMatchers);
```

### JavaScript

```javascript
// 1. In your playwright.config.js
const { expect } = require('@playwright/test');
const { default: playwrightApiMatchers } = require('odottaa');

// 2. extend expect with custom API matchers
expect.extend(playwrightApiMatchers);
```

## API

### toHaveStatusCode

Use `toHaveStatusCode` matcher to verify that the response's status code is equal to the expected status code

```typescript
const response = await request.get('https://example.com/');

await expect(response).toHaveStatusCode(201);
```

### toHaveStatusText

Use `toHaveStatusText` matcher to verify that the response' status text is equal to the expected status text

```typescript
const response = await request.get('https://example.com/404');

await expect(response).toHaveStatusText('Not Found');
```

### toBeCreated

Use `toBeCreated` matcher to verify that the response's status code is 201

```typescript
const response = await request.post('https://example.com/create');

await expect(response).toBeCreated();
```

### toBeUnauthorized

Use `toBeUnauthorized` matcher to verify that the response's status code is 401

```typescript
const response = await request.post('https://example.com/create');

await expect(response).toBeUnauthorized();
```

### toBeForbidden

Use `toBeForbidden` matcher to verify that the response's status code is 403

```typescript
const response = await request.post('https://example.com/create');

await expect(response).toBeForbidden();
```

### toBeNotFound

Use `toBeNotFound` matcher to verify that the response's status code is 404

```typescript
const response = await request.post('https://example.com/list');

await expect(response).toBeNotFound();
```

### toHaveJSON

Use `toHaveJSON` matcher to verify that the response's body json is equal to the all properties of object instances (also known as "deep" equality)

```typescript
const response = await request.get('https://example.com/data.json');
// e.g. response { name: 'Ben', age: 37 }

await expect(response).toHaveJSON({
  name: 'Ben',
  age: 37
});
```

### toContainJSON

Use `toContainJSON` matcher to verify that the response's body array contains that an item with a specific structure and values is contained in an array.

```typescript
const response = await request.get('https://example.com/data.json');
// e.g. response [{ name: 'Ben', age: 37 }, { name: 'Anna', age: 26 }]

await expect(response).toContainJSON({
  name: 'Ben',
  age: 37
});
```

### toMatchJSON

Use `toMatchJSON` matcher to verify that the response's body json matches a subset of the properties of an object. It'll match received objects with properties that are not in the expected object.

```typescript
const response = await request.get('https://example.com/data.json');
// e.g. response [{ name: 'Ben', age: 37 }, { name: 'Anna', age: 26 }]

await expect(response).toMatchJSON({
  name: 'John Doe',
});
```

### toHaveHeader

Use `toHaveHeader` matcher to verify that the response's headers contains the expected header and value

```typescript
const response = await request.get('https://example.com');

// Asserts that the response's headers contains the header 'content-length'
await expect(response).toHaveHeaderName('content-length');

// Asserts that the response's headers contains the header 'content-length' with value '22'
await expect(response).toHaveHeaderName('content-length', '22');
```

### toHaveHeaders

Use `toHaveHeaders` matcher to verify that the response's headers contains the expected header

```typescript
const response = await request.get('https://example.com');

// Single
await expect(response).toHaveHeaders({ 'content-length': '22' });

// Multiple
await expect(response).toHaveHeaders({ 'content-type': 'text/html', 'content-length': '22' });
```

### toHaveContentType

Use `toHaveContentType` matcher to verify that the response' headers content type is equal to the expected type

```typescript
const response = await request.get('https://example.com/');

await expect(response).toHaveContentType('text/html');
```

### toContainTextContent

Use `toContainTextContent` matcher to verify that the response' body text contains the expected text

```typescript
const response = await request.get('https://example.com/');

await expect(response).toContainTextContent('Hello, World!');
```

### toHaveLocation

Use `toHaveLocation` matcher to verify that the response' headers location is equal to the expected location

```typescript
const response = await request.get('https://example.com/');

await expect(response).toHaveLocation('/home');
```

### toBeRedirected

Use `toBeRedirected` matcher to verify that the response' url is being redirected to the expected url

```typescript
const response = await request.get('https://example.com/user/profile');

await expect(response).toBeRedirected('https://example.com/auth/login');
```

## Author

Yevhen Laichenkov <elaichenkov@gmail.com>

## License

[MIT](LICENSE)
