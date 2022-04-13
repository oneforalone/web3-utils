/**
 * The origin data feeds from: https://docs.chain.link/docs/ethereum-addresses
 */

ADDRESS = {
  'btc': "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
  'eth': "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  'bnb': "0x14e613AC84a31f709eadbdF89C6CC390fDc9540A",
  'usdt': "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
  'usdc': "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
  'dai': "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
  'matic': "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676",
};

ABI = {
  'btc': require("./abis/btc-usd.json"),
  'eth': require("./abis/eth-usd.json"),
  'bnb': require("./abis/bnb-usd.json"),
  'usdt': require("./abis/usdt-usd.json"),
  'usdc': require("./abis/usdc-usd.json"),
  'dai': require("./abis/dai-usd.json"),
  'matic': require("./abis/matic-usd.json"),
};

module.exports = {
  ADDRESS,
  ABI,
};