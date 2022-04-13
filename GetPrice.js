const web3 = require("./utils/web3-utils").init_web3();

// more data feeds contract: https://docs.chain.link/docs/ethereum-addresses
const BTC_ORACLE_ABI = require("./abis/btc-usd.json");
const BTC_ORACLE_ADDR = "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c";

async function get_btc_usd() {

  const price_feed = new web3.eth.Contract(BTC_ORACLE_ABI, BTC_ORACLE_ADDR);
  let decimals = await price_feed.methods.decimals().call();
  await price_feed.methods.latestRoundData().call()
    .then((res) => {
      let price = res.answer / (10**decimals);
      console.log("price and decimals: ", res.answer, decimals);
      console.log("BTC price is: %s USDT", price);
      // return price;
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

/**
 * a common interface to get PRICE via CRYPTO NAME
 */
const ABI = require("./chainlink-data-feeds").ABI;
const ADDRESS = require("./chainlink-data-feeds").ADDRESS;

async function get_price(crypto) {
  const CRYPTO_ORACLE_ABI = ABI[crypto];
  const CRYPTO_ORACLE_ADDR = ADDRESS[crypto];
  const price_feed = new web3.eth.Contract(CRYPTO_ORACLE_ABI, CRYPTO_ORACLE_ADDR);

  let decimals = await price_feed.methods.decimals().call();
  await price_feed.methods.latestRoundData().call()
    .then((res) => {
      let price = res.answer / ( 10**decimals );
      console.log("The price of %s is : %s", crypto, price);
      // return price;
      process.exit(0);
    })
    .catch((err) => {

      console.log(err);
      // return -1;
      process.exit(-1);
    });
}

get_price("eth")