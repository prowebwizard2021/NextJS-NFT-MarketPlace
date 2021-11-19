require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString()
const projectId = "599f825122744da192b691b7dd63b0e3";

module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: './artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://mumbai.infura.io/v3/${projectId}`,
      accounts:[privateKey]
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${projectId}`,
      accounts:[privateKey]
    }    
  }
};
