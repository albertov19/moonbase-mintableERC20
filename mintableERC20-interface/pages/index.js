import React, { Component } from 'react';
import { Container, Button, Menu, Message } from 'semantic-ui-react';
import Head from 'next/head';
import DataFeed from '../components/datafeed-page';
import Mint from '../components/mint-page';
import { Link } from '../routes';
class ERC20Faucet extends Component {
   // Nextjs uses this function to render this first server-side
   static async getInitialProps() {
      return {};
   }

   // Initial State
   state = {
      account: 'Not Connected',
      errorMessage: '',
   };

   async componentDidMount() {
      // If already connected display account
      if (
         typeof ethereum !== 'undefined' &&
         ethereum.selectedAddress !== null
      ) {
         this.setState({ account: ethereum.selectedAddress });
      }
   }

   onConnect = async () => {
      if (typeof ethereum === 'undefined') {
         // MetaMask not detected
         this.setState({ account: 'MetaMask not Detected' });
      } else {
         // MetaMask detected - check network
         if (ethereum.chainId !== '0x507') {
            this.setState({ account: 'Only Moonbase Alpha Supported' });
         } else {
            const accounts = await ethereum.request({
               method: 'eth_requestAccounts',
            });

            // Set account to state
            if (accounts) {
               this.setState({ account: accounts[0] });
            }
         }
      }
   };

   render() {
      return (
         <Container>
            <Head>
               <title>Moonbase ERC20Mint</title>
               <link
                  rel='icon'
                  type='image/png'
                  sizes='32x32'
                  href='/favicon.png'
               />
               <link
                  rel='stylesheet'
                  href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
               />
            </Head>
            <Menu style={{ marginTop: '10px' }}>
               <Link route='/'>
                  <a className='item'>Moonbase Alpha ERC20 Faucet</a>
               </Link>
               <Menu.Menu position='right'>
                  <a className='item'> {this.state.account} </a>
                  <Button
                     floated='right'
                     content='Connect MetaMask'
                     icon='plus square'
                     primary
                     onClick={this.onConnect}
                  />
               </Menu.Menu>
            </Menu>
            <br />
            <DataFeed />
            <br />
            <hr />
            <br />
            <Mint account={this.state.account} />
            <br />
            <p>
               Don't judge the code :) as it is for demostration purposes only.
               You can check the source code &nbsp;
               <a href='https://github.com/albertov19/moonbase-mintableERC20'>
                  here
               </a>
            </p>
            <br />
         </Container>
      );
   }
}

export default ERC20Faucet;
