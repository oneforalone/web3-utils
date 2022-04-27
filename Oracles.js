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
  return price_feed.methods.latestRoundData().call()
    .then((res) => {
      let price = res.answer / ( 10**decimals );
      // console.log("The price of %s is : %s", crypto, price);
      return price;
    })
    .catch((err) => {
      console.log(err);
      return -1;
    });
}

/**
 * convert all cryptos to btc
 * crypto args format:
 *   ['crypto1', crypto1_amount, 'crypto2', crypto2_amount, ...]
 */
async function unify_cryptos2btc(cryptos) {
  btc_price = await get_price('btc').then((res) => { return res });

  sum = 0;
  for (var i = 0; i < cryptos.length; i = i + 2) {
    crypto_price = await get_price(cryptos[i]).then((res) => { return res });
    ratio = crypto_price / btc_price;
    crypto2btc = cryptos[i+1] * ratio;
    sum += crypto2btc;
  }
  // fix the decimal of bitcoin: 8
  sum = parseFloat(sum.toFixed(9).slice(0, -1));
  return sum
}

unify_cryptos2btc(['usdt', 10000, 'usdc', 1000, 'btc', 3])
