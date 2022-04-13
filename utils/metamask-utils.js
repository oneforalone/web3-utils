/**
 * Web3.js lib, for the Ethereum entire ecosystem
 * for more about web3.js, please refer to
 * https://web3js.readthedocs.io/en/v1.7.1/getting-started.html
 */

// web3 initiate
var Web3 = require('web3');
// your node or node provider, here we use Alchemy Provider
const providerURL = "https://polygon-mumbai.g.alchemy.com/v2/BjlBWrxhHWhI2cLrgux-geVnbkVCmD18";
const web3 = new Web3(providerURL);

// create an new account
function newAccount() {
  let account = web3.eth.accounts.create(web3.utils.randomHex(32));
  console.log("Create account %s with private key: %s",
    account.address,
    account.privateKey);
}

async function checkTransactions(txHash) {
  await web3.eth.getTransaction(txHash)
    .then(tx => {
      let from = tx.from;
      let to =  tx.to;
      let input = web3.eth.abi.decodeParameters(
        ['string', 'string', 'uint256'],
        tx.input);
      console.log(from, to, input)
  })
}

// listening the latest block and print the transactions in the block
async function listenBlocks() {
  await web3.eth.getBlock("latest")
    .then(block => {
      let txs = block.transactions;
      let length = txs.length;
      for (let i = 0; i < length; i++) {
        checkTransactions(txs[i]);
      }
    })
    .catch(err => console.log(err));
}

/**
 * Tron Network lib
 * https://developers.tron.network/docs/dapp-development-tools-tronweb
 */
const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
// your accounts private key
const privateKey = 'a56fe0625c09219c90a130e4eaafc0f3813d9d3a542937cd8c6e83c32960f5b4';
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

// Shasta Test Network
const fullNodeTest = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNodeTest = new HttpProvider("https://api.shasta.trongrid.io");
const eventServerTest = new HttpProvider("https://api.shasta.trongrid.io");
const tronWebTest = new TronWeb(
  fullNodeTest,
  solidityNodeTest,
  eventServerTest,
  privateKey);

// create an new account
var tronAddress = '';
await tronWeb.createAccount()
  .then(res => {
    console.log("The private key is: ", res.privateKey);
    console.log("The public key is: ", res.publicKey);
    console.log("The base58 address is: ", res.address.base58);
    console.log("The hex address is: ", res.address.hex);
    console.log("Assigning address to tronAddress...");
    tronAddress = res.address.base58;
    console.log("tronAddress value is: ", tronAddress);
  })

async function listenTrxBlocks() {
  await tronWeb.trx.getBlock("latest")
    .then(block => {
      console.log(block);
    })
    .catch(err => console.log(err));
}


/**
 * ERC20 transfer: using usdt on polygon
 */
const ABI = require('./usdt-abi.json');
const CONTRACT_ADDRESS = "";
var contract_instance = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
var amount = 200;
var sender = "0x";
var tx = {
  from: sender,
  to: contract_instance._address,
  data: contract_instance.methods.transfer(RECIPIENT, web3.utils.toWei(amount.toString()).encodeABI()),
  gas: 21000
};

web3.eth.sendTransaction(tx)
  .then(res => {
    console.log("res", res)
  })
  .catch(err => {
  console.log("err", err)
  });
