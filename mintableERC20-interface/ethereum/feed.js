import web3 from './web3.js';
const mintableERC20 = require('./abi/mintableERC20.json');
const ethers = require('ethers');

const tokenInstace = (address) => {
   return new ethers.Contract(address, mintableERC20.abi, web3().getSigner());
};

export default tokenInstace;
