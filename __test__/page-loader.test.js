import os from 'os';
import path from 'path';
import { promises as fs } from 'fs';
import nock from 'nock';
import makeFileNameByUrl from '../src/file';
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

const url = 'https://www.google.com/';

test('loadPage', async () => {
  nock(url).get('/').reply(200, data);
  await loadPage(url, tmpdir);

  const filename = makeFileNameByUrl(url);
  const filepath = path.join(tmpdir, filename);
  const actual = await fs.readFile(filepath, 'utf-8');
  const expected = data;
  expect(actual).toBe(expected);
});
