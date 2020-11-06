import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { convertUrlToBaseName } from './utils.js';

const loadPage = (url, outDir) => axios.get(url)
  .then(({ data }) => {
    const basename = convertUrlToBaseName(url);
    const filename = `${basename}.html`;
    const filepath = path.join(outDir, filename);
    fs.writeFile(filepath, data);
  });

export default loadPage;
