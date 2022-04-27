function init_tron_web() {
  // from https://developers.tron.network/v4.0/reference/tronweb-object-1
  const TronWeb = require('tronweb');
  const HttpProvider = TronWeb.providers.HttpProvider;
  const fullNode = new HttpProvider("https://api.trongrid.io");
  const solidityNode = new HttpProvider("https://api.trongrid.io");
  const eventServer = new HttpProvider("Https://api.trongrid.io");

  require('dotenv').config();
  const privateKey = process.env.PRIVATE_KEY;

  return new TronWeb(fullNode, solidityNode, eventServer, privateKey);
}

async function new_address() {
  const tronWeb = init_tron_web()
  await tronWeb.createAccount().then((res) => {
    return (res.address.base58, res.privateKey)
  });
}
