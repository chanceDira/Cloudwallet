require("@nomiclabs/hardhat-waffle");

require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  // solidity: "0.7.3",
  solidity: "0.8.0",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${API_URL}`,
      accounts: [`${PRIVATE_KEY}`]
    }
  }
};
