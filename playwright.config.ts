import playwrightApiMatchers from './src';
import { expect, PlaywrightTestConfig } from '@playwright/test';

expect.extend(playwrightApiMatchers);

const config: PlaywrightTestConfig = {
  reporter: process.env.CI ? 'github' : 'list',
  webServer: {
    command: 'npm start',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3000/',
  },
};

export default config;
