
// args = {
//   method: 'verify_transfer',
//   account: 'test1',
//   amount: '1'
// }
// const { spawn } = require('child_process');
// let pyprog_args = ['btc-utils.py', args.method, args.account];
// let recipent = args.recipent;
// let amount = args.amount;
// if (amount) {
//   pyprog_args.push("--amount");
//   pyprog_args.push(amount);
// }

// if (recipent) {
//   pyprog_args.push("--recipent");
//   pyprog_args.push(recipent);
// }

// const pyprog = spawn('python3', pyprog_args)
// pyprog.stdout.on('data', (data) => {
//   console.log(data.toString());
// });

// pyprog.stderr.on('data', (data) => {
//   console.log(data.toString());
// });

// solutions for installing awesome-qr package error
// https://stackoverflow.com/questions/22100213/package-cairo-was-not-found-in-the-pkg-config-search-path-node-j-s-install-canv
// On MacOS: brew install pkg-config cairo pango libpng jpeg giflib

// from: https://github.com/SumiMakito/Awesome-qr.js
const { AwesomeQR } = require("awesome-qr");
const fs = require("fs");
const background = fs.readFileSync("./background.png");

const address = "tb1qjc2ynzhhyszxdaccflxj4kq67m9k8638ax2aha";
async function generate_btc_addr_qr() {
  const buffer = await new AwesomeQR({
    text: address,
    size: 500,
    background: background,
  }).draw()

  fs.writeFileSync("qrcode.png", buffer);
}

generate_btc_addr_qr()
