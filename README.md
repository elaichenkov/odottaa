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
- [Custom matchers](#custom-matchers)
  - [toHaveStatusCode](#tohavestatuscode)
  - [toHaveStatusText](#tohavestatustext)
  - [toHaveJSON](#tohavejson)
  - [toContainJSON](#tocontainjson)
  - [toHaveHeader](#tohaveheader)
  - [toHaveText](#tohavetext)
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

## Custom matchers

### toHaveStatusCode

The `toHaveStatusCode` matcher verifies that the response is equal the expected status code

```typescript
const response = await request.get('https://example.com/');

await expect(response).toHaveStatusCode(201);
```

### toHaveStatusText

The `toHaveStatusText` matcher verifies that the response is equal to the expected status text

```typescript
const response = await request.get('https://example.com/404');

await expect(response).toHaveStatusText('Not Found');
```

### toHaveJSON

The `toHaveJSON` matcher verifies that the response' body json is equal to the expected object

```typescript
const response = await request.get('https://example.com/data.json');
// e.g. response returns { name: 'Ben', age: 37 }

await expect(response).toHaveJSON({
  name: 'Ben',
  age: 37
});
```

### toContainJSON

The `toContainJSON` matcher verifies that the response' body json contains the expected object

```typescript
const response = await request.get('https://example.com/data.json');
// e.g. response returns [{ name: 'Ben', age: 37 }, { name: 'Anna', age: 26 }]

await expect(response).toContainJSON({
  name: 'Ben',
  age: 37
});
```

### toHaveHeader

The `toHaveHeader` matcher verifies that the response' headers contains the expected header name and value

```typescript
const response = await request.get('https://example.com/data.json');

await expect(response).toHaveHeader({
  name: 'Content-Type', 
  value: 'application/json'
});
```

### toHaveText

The `toHaveText` matcher verifies that the response' body text contains the expected text

```typescript
const response = await request.get('https://example.com/');

await expect(response).toHaveText('Hello, World!');
```

## Author

Yevhen Laichenkov <elaichenkov@gmail.com>

## License

[MIT](LICENSE)
