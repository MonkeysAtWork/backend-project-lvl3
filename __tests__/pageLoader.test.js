import nock from 'nock';
import path from 'path';
import fs from 'fs/promises';

import pageLoader from '../src/pageLoader';
import { async } from 'regenerator-runtime';

nock.disableNetConnect();

const fixturesPath = path.join(__dirname, '__fixtures__');
let testPageContent;

const url = 'http://ru.test.com';
const expectedPageName = 'ru-test-com-hexlet.html';

beforeAll(async () => {
  try {
    await fs.unlink(path.join(fixturesPath, '..', expectedPageName));
  } finally {
    testPageContent = await fs.readFile(path.join(fixturesPath, 'index.html'), 'utf-8');
  }
});

nock(url)
  .get('/hexlet')
  .reply(200, testPageContent);

// beforeEach(() => {
//   document.documentElement.innerHTML = initHtml;
//   run();
//   form = document.querySelector('#rssAddForm');
//   input = form.elements.link;
// });

test('Page loader', async () => {
  const pageName = await pageLoader(url + '/hexlet');
  expect(pageName).toBe(expectedPageName);

  const savedPageContent = await fs.readFile(path.join(fixturesPath, '..', pageName), 'utf-8');
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
