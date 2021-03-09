import axios from 'axios';
import fs from 'fs/promises';

const makeOutputFilename = (url) => {
  const [_, path] = url.split('://');
  const newName = path.replaceAll(/\/|\./g, '-');
  return `${newName}.html`;
}

const pageLoader = (url) => {
  const outputFileName = makeOutputFilename(url)
  return axios.get(url)
    .then((resp) => console.log(resp.data))
    .then((resp) => fs.writeFile(outputFileName, resp.data))
    .then(() => outputFileName)
    .catch((err) => console.error(err));
};

export default pageLoader;
