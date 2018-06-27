import web3 from './web3';
import main from './build/main.json';

const instance = new web3.eth.Contract(
  JSON.parse(main.interface),
  '0x5035eCf9597fb72e8f32078F190aB729cE043193'
);

export default instance;
