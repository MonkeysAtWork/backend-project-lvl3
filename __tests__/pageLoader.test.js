import nock from 'nock';
import path from 'path';
import fs from 'fs/promises';
import os from 'os'

import pageLoader from '../src/';
import { beforeEach } from '@jest/globals';
// import { async } from 'regenerator-runtime';

nock.disableNetConnect();

const fixturesPath = path.join(__dirname, '__fixtures__');
const baseUrl = 'http://ru.test.com';
let tmpDir;

beforeEach(async () => {
  tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
})

test('Page loader', async () => {
  const testPageContent = await fs.readFile(path.join(fixturesPath, 'index.html'), 'utf-8');
  nock(baseUrl)
    .get('/hexlet')
    .reply(200, testPageContent);

  const testUrl1 = baseUrl + '/hexlet';

  const pageName = await pageLoader(testUrl1, tmpDir);
  const savedPagePath = path.join(tmpDir, 'ru-test-com-hexlet.html');
  expect(pageName).toBe(savedPagePath);

  const savedPageContent = await fs.readFile(savedPagePath, 'utf-8');
  expect(savedPageContent).toBe(testPageContent);
});

// const response = fs.readFileSync(path.join(fixturesPath, 'rss_0.xml'), 'utf-8');

// const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
// const getTree = () => html(document.body.innerHTML);

// nock('https://cors-anywhere.herokuapp.com')
//   // .log(console.log)
//   .get(/undefined$/)
//   .replyWithError('some error')
//   .get(/404$/)
//   .reply(404)
//   .get(/nofeed$/)
//   .reply(200, '<!doctype html><html><head></head><body></body></html>')
//   .get(/feed$/)
//   .twice()
