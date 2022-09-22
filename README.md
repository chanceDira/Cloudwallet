# Cloud Wallet

This is a wallet storing clients for given lock time. the funds of each are stored in smart contract with respective locktime. The clients is not allowed to withdraw funds unless the lock time is set to true

Try running some of the following tasks:

### Testing
Make sure you are on Rinkeby Testnet.
```shell
cd Cloudwallet
npm install
npm start
npx hardhat compile
npx hardhat test
npx hardhat node
npx hardhat help
```
