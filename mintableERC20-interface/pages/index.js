import React, { useEffect, useState } from 'react';
import { Container, Button, Menu, Icon } from 'semantic-ui-react';
import detectEthereumProvider from '@metamask/detect-provider';
import * as ethers from 'ethers';
import Head from 'next/head';
import DataFeed from '../components/datafeed-page';
import { Link } from '../routes';

const App = () => {
  // Initial State
  const [account, setAccount] = useState();
  const [connected, setConnected] = useState(false);
  const [networkName, setNetworkName] = useState('Not Connected');

  useEffect(() => {
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
    let accounts;

    if (provider) {
      accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      
      const chainId = await provider.request({
        method: 'eth_chainId',
      });

      let networkName;
      switch (chainId) {
        case '0x507':
          networkName = 'Moonbase Alpha';
          break;
        default:
          networkName = 'Not Connected';
          setAccount('Only Moonbase Alpha Supported');
          break;
      }

      if (networkName !== 'Not Connected') {
        setNetworkName(networkName);

        // Update State
        if (accounts) {
          setAccount(ethers.utils.getAddress(accounts[0]));
          setConnected(true);
        }
      }
    } else {
      // MetaMask not detected
      setNetworkName('MetaMask not Detected');
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
          {{ connected }.connected ? (
            <Button floated='right' icon labelPosition='left' color='green'>
              <Icon name='check'></Icon>
              {networkName}
            </Button>
          ) : (
            <Button
              floated='right'
              icon
              labelPosition='left'
              onClick={onConnect}
              primary
            >
              <Icon name='plus square'></Icon>
              Connect EVM Wallet
            </Button>
          )}
        </Menu.Menu>
      </Menu>
      <br />
      <DataFeed account={account} />
      <br />
      <p>
        Don't judge the code :) as it is for demonstration purposes only. You
        can check the source code &nbsp;
        <a href='https://github.com/albertov19/moonbase-mintableERC20'>here</a>
      </p>
      <br />
    </Container>
  );
};

export default App;
