import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const makeOutputFilename = (url) => {
  const [_, urlWithoutProtocol] = url.split('://');
  const newName = urlWithoutProtocol.replaceAll(/\/|\./g, '-');
  return `${newName}.html`;
}

const pageLoader = (url, outDir) => {
  const fileName = makeOutputFilename(url)
  const outPath = path.join(outDir, fileName);
  return axios.get(url)
    // .then((resp) => {
    //   console.log(resp)
    //   return resp
    // })
    .then((resp) => fs.writeFile(outPath, resp.data))
    .then(() => outPath)
    .catch((err) => console.error(err));
};

export default pageLoader;
