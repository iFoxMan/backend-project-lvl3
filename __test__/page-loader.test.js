import os from 'os';
import path from 'path';
import { promises as fs } from 'fs';
import loadPage from '../src/page-loader';

let tmpdir;

const makeTmpDir = async () => {
  const dirpath = path.join(os.tmpdir(), 'page-loader-');
  return fs.mkdtemp(dirpath);
};

beforeAll(async () => {
  tmpdir = await makeTmpDir();
  await loadPage('https://ru.hexlet.io/courses', tmpdir);
});

test('match actual and expected files size', async () => {
  const pathToActualDir = tmpdir;
  const pathToExpectedDir = path.join('__fixtures__', 'expected-dir');
  const actualStat = await fs.stat(pathToActualDir);
  const expectedStat = await fs.stat(pathToExpectedDir);
  expect(actualStat.size).toBe(expectedStat.size);
});

test.each([
  'ru-hexlet-io-courses.html',
  'ru-hexlet-io-courses_files/ru-hexlet-io-assets-application.css',
  'ru-hexlet-io-courses_files/ru-hexlet-io-assets-professions-nodejs.png',
  'ru-hexlet-io-courses_files/ru-hexlet-io-courses.html',
  'ru-hexlet-io-courses_files/ru-hexlet-io-packs-js-runtime.js',
])('match actual and expected files, filepath: %s', async (filepath) => {
  const pathToActualFile = path.join(tmpdir, filepath);
  const pathToExpectedFile = path.join('__fixtures__', 'expected-dir', filepath);
  const actual = await fs.readFile(pathToActualFile, 'utf-8');
  const expected = await fs.readFile(pathToExpectedFile, 'utf-8');
  expect(actual).toBe(expected);
});
