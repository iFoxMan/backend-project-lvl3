import os from 'os';
import path from 'path';
import { promises as fs } from 'fs';
import nock from 'nock';
import { convertUrlToBaseName } from '../src/utils';
import loadPage from '../src/page-loader';

let data;
let tmpdir;

beforeAll(async () => {
  const filepath = path.join('__fixtures__', 'index.html');
  data = await fs.readFile(filepath, 'utf-8');
});

beforeEach(async () => {
  const dirpath = path.join(os.tmpdir(), 'page-loader-');
  tmpdir = await fs.mkdtemp(dirpath);
});

const hostname = 'https://ru.hexlet.io/';
const pathname = '/courses';
const url = new URL(pathname, hostname).href;

test('loadPage', async () => {
  nock(hostname).get(pathname).reply(200, data);
  await loadPage(url, tmpdir);

  const basename = convertUrlToBaseName(url);
  const filename = `${basename}.html`;
  const filepath = path.join(tmpdir, filename);
  const actual = await fs.readFile(filepath, 'utf-8');
  const expected = data;
  expect(actual).toBe(expected);
});
