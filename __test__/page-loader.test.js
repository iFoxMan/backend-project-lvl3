import os from 'os';
import path from 'path';
import { promises as fs } from 'fs';
import nock from 'nock';
import loadPage from '../src/page-loader';

let tmpdir;
let filepaths;

const makeTmpDir = async () => {
  const dirpath = path.join(os.tmpdir(), 'page-loader-');
  return fs.mkdtemp(dirpath);
};

const getFixturePath = (...paths) => path.join('__fixtures__', ...paths);

const readFixtureFile = async (...paths) => {
  const fixtureFilePath = getFixturePath(...paths);
  return fs.readFile(fixtureFilePath, 'utf-8');
};

const turnOnNock = async () => {
  const configs = JSON.parse(await readFixtureFile('nock.json'));
  const promises = configs.map(async ({ urlbase, urlpath, filepath }) => {
    const data = await readFixtureFile(filepath);
    nock(urlbase).get(urlpath).reply(200, data);
  });
  Promise.all(promises);
};

beforeAll(async () => {
  tmpdir = await makeTmpDir();
  filepaths = JSON.parse(await readFixtureFile('filepaths.json'));
  turnOnNock();
  await loadPage('https://ru.hexlet.io/courses', tmpdir);
});

test('match actual and expected direcory size', async () => {
  const actualStat = await fs.stat(tmpdir);
  const expectedStat = await fs.stat(getFixturePath('expected-dir'));
  expect(actualStat.size).toBe(expectedStat.size);
});

test('match actual and expected files', async () => {
  const promises = filepaths.map(async (filepath) => {
    const pathToActualFile = path.join(tmpdir, filepath);
    const actual = await fs.readFile(pathToActualFile, 'utf-8');
    const expected = await readFixtureFile('expected-dir', filepath);
    expect(actual).toBe(expected);
  });
  await Promise.all(promises);
});
