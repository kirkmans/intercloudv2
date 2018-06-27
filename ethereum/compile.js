const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const mainPath = path.resolve(__dirname, 'contracts', 'main.sol');
const source1 = fs.readFileSync(mainPath, 'utf8');


const output1 = solc.compile(source1, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output1) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output1[contract]
  );
}

