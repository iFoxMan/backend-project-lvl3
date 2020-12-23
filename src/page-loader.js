import path from 'path';
import { promises as fs } from 'fs';

const dirname = 'ru-hexlet-io-courses_files';

const filepaths = [
  'ru-hexlet-io-courses.html',
  path.join(dirname, 'ru-hexlet-io-assets-application.css'),
  path.join(dirname, 'ru-hexlet-io-assets-professions-nodejs.png'),
  path.join(dirname, 'ru-hexlet-io-courses.html'),
  path.join(dirname, 'ru-hexlet-io-packs-js-runtime.js'),
];

const simulatePageLoad = async (outDir) => {
  await fs.mkdir(path.join(outDir, dirname));
  const promises = filepaths.map(async (filepath) => {
    const srcpath = path.join('__fixtures__', 'expected-dir', filepath);
    const data = await fs.readFile(srcpath, 'utf-8');
    const distpath = path.join(outDir, filepath);
    return fs.writeFile(distpath, data);
  });
  return Promise.all(promises);
};

const loadPage = (_url, outDir) => simulatePageLoad(outDir);

export default loadPage;
