import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { makeFileNameByUrl } from './name.js';

const loadPage = (url, outDir) => axios.get(url)
  .then(({ data }) => {
    const filename = makeFileNameByUrl(url, 'html');
    const filepath = path.join(outDir, filename);
    fs.writeFile(filepath, data);
  });

export default loadPage;
