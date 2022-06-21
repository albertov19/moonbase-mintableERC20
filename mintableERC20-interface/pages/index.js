import React, { useEffect, useState } from 'react';
import { Container, Button, Menu, Icon } from 'semantic-ui-react';
import detectEthereumProvider from '@metamask/detect-provider';
import * as ethers from 'ethers';
import Head from 'next/head';
import DataFeed from '../components/datafeed-page';
import Mint from '../components/mint-page';
import { Link } from '../routes';

const App = () => {
  const [account, setAccount] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(async () => {
    await checkMetamask;

    // Check for changes in Metamask (account and chain)
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  const checkMetamask = async () => {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });

    if (provider) {
      const chainId = await provider.request({
        method: 'eth_chainId',
      });
      // Moonbase Alpha's chainId is 1287, which is 0x507 in hex
      if (chainId === '0x507') {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        console.log(`O -> ${accounts}`);

        // Update State
        if (accounts) {
          console.log(`I -> ${accounts}`);
          setAccount(ethers.utils.getAddress(accounts[0]));
          setConnected(true);
        }
      } else {
        // Only Moonbase Alpha is Supported
        setAccount('Only Moonbase Alpha Supported');
      }
    } else {
      // MetaMask not detected
      setAccount('MetaMask not Detected');
    }
  };

  const onConnect = async () => {
    await checkMetamask();
  };

  return (
    <Container>
      <Head>
        <title>Moonbase ERC20Mint</title>
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon.png' />
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
          <a className='item'> {account} </a>
          {connected ? (
            <Button floated='right' icon labelPosition='left' color='green'>
              <Icon name='check'></Icon>
              Connected
            </Button>
          ) : (
            <Button floated='right' icon labelPosition='left' onClick={onConnect} primary>
              <Icon name='plus square'></Icon>
              Connect MetaMask
            </Button>
          )}
        </Menu.Menu>
      </Menu>
      <br />
      <DataFeed />
      <br />
      <hr />
      <br />
      <Mint account={account} />
      <br />
      <p>
        Don't judge the code :) as it is for demostration purposes only. You can check the source
        code &nbsp;
        <a href='https://github.com/albertov19/moonbase-mintableERC20'>here</a>
      </p>
      <br />
    </Container>
  );
};

export default App;
