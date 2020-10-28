#!/usr/bin/env node

// TODO: resolve import description and version from package.json
// Error: Unknown file extension ".json" for /<path>/backend-project-lvl3/package.json
import { program } from 'commander';
// import { description, version } from '../package.json';
import pageLoader from '../src/page-loader.js';

program
  .arguments('<url>')
  // .description(description)
  // .version(version)
  .option('--output [dirpath]', 'output directory', '.')
  .action((url) => {
    pageLoader(url, program.output)
      .catch((err) => console.log(err.message));
  })
  .parse(process.argv);
