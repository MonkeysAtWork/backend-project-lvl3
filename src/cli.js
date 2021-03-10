import commander from 'commander';
import { async } from 'regenerator-runtime';
import pageLoader from './index.js';


export default function () {
  commander
    .version('0.1.0')
    .description('Download page from url.')
    .option('-o, --output <path>', 'output dir', process.cwd())
    .arguments('<url>')
    .action((url) => pageLoader(url, commander.opts().output).then(console.log))
    .parse(process.argv);
}
