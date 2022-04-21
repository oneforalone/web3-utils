const { btcPyScript } = require('./btc-pyscript');

// solutions for installing awesome-qr package error
// https://stackoverflow.com/questions/22100213/package-cairo-was-not-found-in-the-pkg-config-search-path-node-j-s-install-canv
// On MacOS: brew install pkg-config cairo pango libpng jpeg giflib
// from: https://github.com/SumiMakito/Awesome-qr.js
async function generate_btc_address_qr(account) {
  args = {
    method: 'get_address',
    account: account
  }
  const address = await btcPyScript(args).then((res) => {
    return res;
  });

  const { AwesomeQR } = require("awesome-qr");
  const fs = require("fs");
  const background = fs.readFileSync("./background.png");

  const buffer = await new AwesomeQR({
    test: address,
    size: 500,
    background: background
  }).draw();

  fs.writeFileSync("./qrcode.png", buffer);
}

const express = require('express');
const app = express()
app.get("/", (req, res) => {
  let method = req.query.method;
  let account = req.query.account;
  let py_args = {
    'method': method,
    'account': account,
  };

  let amount = req.query.amount;
  if (amount) {
    py_args['amount'] = amount;
  }

  let recipent = req.query.recipent;
  if (recipent) {
    py_args['recipent'] = recipent;
  }
  console.log(py_args)
  btcPyScript(py_args).then(function(from_pyprog) {
    console.log(from_pyprog.toString())
    res.end(from_pyprog);
  });
})

// app.listen(4000, () => console.log('Application listening on port 4000!'))

generate_btc_address_qr("test1")
