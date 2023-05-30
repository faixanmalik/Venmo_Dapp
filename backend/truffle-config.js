const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    inf_Venmo_Dapp_goerli: {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('d:\\Documents\\Crypto-Currency\\key.txt', 'utf-8'), "https://goerli.infura.io/v3/d931864db65942a88cd855ecbaa040ad")
    },
    inf_Lottery_goerli: {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('d:\\Documents\\Crypto-Currency\\key.txt', 'utf-8'), "https://goerli.infura.io/v3/e3e4920f88d344829a80706d2569c775")
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.15"
    }
  }
};
