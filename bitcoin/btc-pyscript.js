const btcPyScript = (args) => {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    let pyprog_args = ['./btc-utils.py', args.method, args.account];
    let recipent = args.recipent;
    let amount = args.amount;
    if (amount) {
      pyprog_args.push("--amount");
      pyprog_args.push(amount);
    }

    if (recipent) {
      pyprog_args.push("--recipent");
      pyprog_args.push(recipent);
    }
    const pyprog = spawn('python3', pyprog_args)
    pyprog.stdout.on('data', (data) => {
      resolve(data.toString());
    });

    pyprog.stderr.on('data', (data) => {
      reject(data.toString());
    });

  })
}

module.exports = {
  btcPyScript
};