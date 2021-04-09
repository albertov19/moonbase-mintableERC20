import React, { Component } from 'react';
import tokenInstance from '../ethereum/feed';
const addresses = require('../ethereum/addresses');

class Table extends Component {
   // Nextjs uses this function to render this first server-side
   static async getInitialProps() {
      onUpdate();
   }

   // Set Initial State
   state = {
      errorMessage: '',
      mercBalState: 0,
      venBalState: 0,
      erthBalState: 0,
      marsBalState: 0,
      jupBalState: 0,
      satBalState: 0,
      unsBalState: 0,
      neptBalState: 0,
      plutBalState: 0,
      mercMintState: 'false',
      venMintState: 'false',
      erthMintState: 'false',
      marsMintState: 'false',
      jupMintState: 'false',
      satMintState: 'false',
      unsMintState: 'false',
      neptMintState: 'false',
      plutMintState: 'false',
   };

   async componentDidMount() {
      this.onUpdate();
   }

   componentWillUnmount() {
      clearInterval(this.intervalID);
   }

   onUpdate = async () => {
      // Mercury
      const [mercBal, mercMint] = await this.getBalance(addresses.mercury);
      // Venus
      const [venBal, venMint] = await this.getBalance(addresses.venus);
      // Earth
      const [erthBal, erthMint] = await this.getBalance(addresses.earth);
      // Mars
      const [marsBal, marsMint] = await this.getBalance(addresses.mars);
      // Jupiter
      const [jupBal, jupMint] = await this.getBalance(addresses.jupiter);
      // Saturn
      const [satBal, satMint] = await this.getBalance(addresses.saturn);
      // Uranus
      const [unsBal, unsMint] = await this.getBalance(addresses.uranus);
      // Neptune
      const [neptBal, neptMint] = await this.getBalance(addresses.neptune);
      // Pluto
      const [plutBal, plutMint] = await this.getBalance(addresses.pluto);

      this.setState({
         // Set Balance
         mercBalState: mercBal,
         venBalState: venBal,
         erthBalState: erthBal,
         marsBalState: marsBal,
         jupBalState: jupBal,
         satBalState: satBal,
         unsBalState: unsBal,
         neptBalState: neptBal,
         plutBalState: plutBal,

         // Set Can Mint
         mercMintState: mercMint,
         venMintState: venMint,
         erthMintState: erthMint,
         marsMintState: marsMint,
         jupMintState: jupMint,
         satMintState: satMint,
         unsMintState: unsMint,
         neptMintState: neptMint,
         plutMintState: plutMint,
      });

      this.intervalID = setTimeout(this.onUpdate.bind(this), 5000);
   };

   getBalance = async (address) => {
      // Get token balance and mint state
      try {
         const contractInstance = tokenInstance(address);
         const dec = await contractInstance.decimals();
         const mint = await contractInstance.canMint(ethereum.selectedAddress);
         const balance = await contractInstance.balanceOf(ethereum.selectedAddress);
         return [(balance.toString()/ Math.pow(10,dec)).toFixed(2), mint.toString()];
      } catch (error) {
         // Could not fetch price return error
         console.log(error);
         return [0, 'N/A'];
      }
   };

   render() {
      return (
         <div>
            <h3>Token Balance Information</h3>
            <p>
               Information displayed in the following table corresponds to
               on-chain balance of each of the following ERC20 tokens on the Moonbase Alpha TestNet!
            </p>
            <table className='ui celled table'>
               <thead>
                  <tr>
                     <th>ERC20 Token</th>
                     <th>Balance</th>
                     <th>Can Mint?</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td data-label='ERC20 Token'>Mercury</td>
                     <td data-label='Balance'>{this.state.mercBalState}</td>
                     <td data-label='Can Mint?'>{this.state.mercMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td data-label='ERC20 Token'>Venus</td>
                     <td data-label='Balance'>{this.state.venBalState}</td>
                     <td data-label='Can Mint?'>{this.state.venMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td data-label='ERC20 Token'>Earth</td>
                     <td data-label='Balance'>{this.state.erthBalState}</td>
                     <td data-label='Can Mint?'>{this.state.erthMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td data-label='ERC20 Token'>Mars</td>
                     <td data-label='Balance'>{this.state.marsBalState}</td>
                     <td data-label='Can Mint?'>{this.state.marsMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td data-label='ERC20 Token'>Jupiter</td>
                     <td data-label='Balance'>{this.state.jupBalState}</td>
                     <td data-label='Can Mint?'>{this.state.jupMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td data-label='ERC20 Token'>Saturn</td>
                     <td data-label='Balance'>{this.state.satBalState}</td>
                     <td data-label='Next Mint'>{this.state.satMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td data-label='ERC20 Token'>Uranus</td>
                     <td data-label='Balance'>{this.state.unsBalState}</td>
                     <td data-label='Next Mint'>{this.state.unsMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td data-label='ERC20 Token'>Neptune</td>
                     <td data-label='Balance'>{this.state.neptBalState}</td>
                     <td data-label='Next Mint'>{this.state.neptMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td data-label='ERC20 Token'>Pluto</td>
                     <td data-label='Balance'>{this.state.plutBalState}</td>
                     <td data-label='Next Mint'>{this.state.plutMintState}</td>
                  </tr>
               </tbody>
            </table>
         </div>
      );
   }
}

export default Table;
