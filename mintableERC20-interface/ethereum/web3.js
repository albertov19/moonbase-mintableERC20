const ethers = require('ethers');

const web3 = () => {
   if (typeof ethereum !== 'undefined' && ethereum.chainId === '0x507') {
      // We are in the browser and MetaMask is running
      return new ethers.providers.Web3Provider(ethereum);
   } else {
      // We are on the server *OR* the user is not running metamask
      return new ethers.providers.StaticJsonRpcProvider(
         'https://rpc.testnet.moonbeam.network',
         {
            chainId: 1287,
            name: 'moonbase-alpha',
         }
      );
   }
};

export default web3;
