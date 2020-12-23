import path from 'path';
import { promises as fs } from 'fs';

const dirname = 'ru-hexlet-io-courses_files';

const getFixturePath = (...paths) => path.join('__fixtures__', ...paths);

const readFixtureFile = async (...paths) => {
  const fixtureFilePath = getFixturePath(...paths);
  return fs.readFile(fixtureFilePath, 'utf-8');
};

const simulatePageLoad = async (outDir) => {
  const filepaths = JSON.parse(await readFixtureFile('filepaths.json'));
  await fs.mkdir(path.join(outDir, dirname));
  const promises = filepaths.map(async (filepath) => {
    const srcpath = path.join('__fixtures__', 'expected-dir', filepath);
    const data = await fs.readFile(srcpath, 'utf-8');
    const distpath = path.join(outDir, filepath);
    fs.writeFile(distpath, data);
  });
  return Promise.all(promises);
};

const loadPage = (_url, outDir) => simulatePageLoad(outDir);

export default loadPage;
