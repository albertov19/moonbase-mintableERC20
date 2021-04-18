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
      timeMint: 0,
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
         return [(balance.toString()/ Math.pow(10,dec)).toFixed(2), mint.toString(), symbol];
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
               Information displayed in the following table corresponds to your
               on-chain balance of each of the following ERC20 tokens on the Moonbase Alpha TestNet! <br />
               Users can mint 100 tokens every hour in each ERC20 token contract. <br />
               There are 8 tokens that represent each planet of the solar system. The 9th token is for Pluto, which is not <a href="https://www.loc.gov/everyday-mysteries/astronomy/item/why-is-pluto-no-longer-a-planet/">considered a planet anymore.</a>
            </p>
            <table className='ui celled table' style={{textAlign: 'center'}}>
               <thead>
                  <tr>
                     <th>Logo</th>
                     <th>ERC20 Token Name</th>
                     <th>Symbol</th>
                     <th>Address</th>
                     <th>Balance</th>
                     <th>Can Mint?</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>
                        <img src="/logos/mercury.svg" alt="MercuryLogo" style={{width: 32, height: 32}}/>
                     </td>
                     <td data-label='ERC20 Token'>Mercury</td>
                     <td data-label='Symbol'>MERC</td>
                     <td data-label='ERC20 Token'>{addresses.mercury}</td>
                     <td data-label='Balance'>{this.state.mercBalState}</td>
                     <td data-label='Can Mint?'>{this.state.mercMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td>
                        <img src="/logos/venus.svg" alt="VenusLogo" style={{width: 32, height: 32}}/>
                     </td>
                     <td data-label='ERC20 Token'>Venus</td>
                     <td data-label='Symbol'>VEN</td>
                     <td data-label='ERC20 Token'>{addresses.venus}</td>
                     <td data-label='Balance'>{this.state.venBalState}</td>
                     <td data-label='Can Mint?'>{this.state.venMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td>
                        <img src="/logos/earth.svg" alt="EarthLogo" style={{width: 32, height: 32}}/>
                     </td>
                     <td data-label='ERC20 Token'>Earth</td>
                     <td data-label='Symbol'>ERTH</td>
                     <td data-label='ERC20 Token'>{addresses.earth}</td>
                     <td data-label='Balance'>{this.state.erthBalState}</td>
                     <td data-label='Can Mint?'>{this.state.erthMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td>
                        <img src="/logos/mars.svg" alt="MarsLogo" style={{width: 32, height: 32}}/>
                     </td>
                     <td data-label='ERC20 Token'>Mars</td>
                     <td data-label='Symbol'>MARS</td>
                     <td data-label='ERC20 Token'>{addresses.mars}</td>
                     <td data-label='Balance'>{this.state.marsBalState}</td>
                     <td data-label='Can Mint?'>{this.state.marsMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td>
                        <img src="/logos/jupiter.svg" alt="JupiterLogo" style={{width: 32, height: 32}}/>
                     </td>
                     <td data-label='ERC20 Token'>Jupiter</td>
                     <td data-label='Symbol'>JUP</td>
                     <td data-label='ERC20 Token'>{addresses.jupiter}</td>
                     <td data-label='Balance'>{this.state.jupBalState}</td>
                     <td data-label='Can Mint?'>{this.state.jupMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td>
                        <img src="/logos/saturn.svg" alt="SaturnLogo" style={{width: 32, height: 32}}/>
                     </td>
                     <td data-label='ERC20 Token'>Saturn</td>
                     <td data-label='Symbol'>SAT</td>
                     <td data-label='ERC20 Token'>{addresses.saturn}</td>
                     <td data-label='Balance'>{this.state.satBalState}</td>
                     <td data-label='Next Mint'>{this.state.satMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td>
                        <img src="/logos/uranus.svg" alt="UranusLogo" style={{width: 32, height: 32}}/>
                     </td>
                     <td data-label='ERC20 Token'>Uranus</td>
                     <td data-label='Symbol'>UNS</td>
                     <td data-label='ERC20 Token'>{addresses.uranus}</td>
                     <td data-label='Balance'>{this.state.unsBalState}</td>
                     <td data-label='Next Mint'>{this.state.unsMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td>
                        <img src="/logos/neptune.svg" alt="NeptuneLogo" style={{width: 32, height: 32}}/>
                     </td>
                     <td data-label='ERC20 Token'>Neptune</td>
                     <td data-label='Symbol'>NEPT</td>
                     <td data-label='ERC20 Token'>{addresses.neptune}</td>
                     <td data-label='Balance'>{this.state.neptBalState}</td>
                     <td data-label='Next Mint'>{this.state.neptMintState}</td>
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <td>
                        <img src="/logos/pluto.svg" alt="PlutoLogo" style={{width: 32, height: 32}}/>
                     </td>
                     <td data-label='ERC20 Token'>Pluto</td>
                     <td data-label='Symbol'>PLUT</td>
                     <td data-label='ERC20 Token'>{addresses.pluto}</td>
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
