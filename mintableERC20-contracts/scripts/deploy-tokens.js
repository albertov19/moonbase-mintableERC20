const { ethers } = require('hardhat');

const names = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
const symbols = ['MERC', 'VEN', 'ERTH', 'MARS', 'JUP', 'SAT', 'UNS', 'NEPT', 'PLUT'];


// Deploy function
async function deploy() {
   console.log(`----- DEPLOYMENTS -----`);
   [account1] = await ethers.getSigners();

   deployerAddress = account1.address;
   console.log(`Deploying token contracts using ${deployerAddress}`);

   //Deploy Tokens
   for (let i = 0; i <= names.length-1; i++){
      const tok = await ethers.getContractFactory('mintableERC20');
      const tokInstance = await tok.deploy(names[i], symbols[i]);
      await tokInstance.deployed();
      const tokAddress = tokInstance.address;
      console.log(`Deploy: ${names[i]} deployed to : ${tokAddress}`);
   }


}

deploy()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
