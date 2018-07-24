const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledMain = require('./build/main.json');

const provider = new HDWalletProvider(
  'tone rib wink must balance unveil behave latin owner apple tiger shop',
  'http://localhost:8545'
  //'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledMain.interface)
  )
    .deploy({ data: compiledMain.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
