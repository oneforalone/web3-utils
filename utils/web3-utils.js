const INFURA_PROVIDER = "wss://mainnet.infura.io/ws/v3/48c4fb93a3794a1fb80da6c53226db1c";
function init_web3(provider=INFURA_PROVIDER) {
  const Web3 = require("web3");
  const web3 = new Web3(provider);
  return web3;
}

module.exports = {
  init_web3
};