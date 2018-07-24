import web3 from './web3';
import main from './build/main.json';

const instance = new web3.eth.Contract(
  JSON.parse(main.interface),
  '0xE9924d352a6d6e73a190a952211FCbCA8762CdEe'
);

export default instance;
