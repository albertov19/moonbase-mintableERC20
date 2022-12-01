import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Container } from 'semantic-ui-react';

import tokenInstance from '../ethereum/feed';

const addresses = require('../ethereum/addresses');

const tokenNames = [
  {
    name: 'Mercury',
    symbol: 'MERC',
  },
  {
    name: 'Venus',
    symbol: 'VEN',
  },
  {
    name: 'Earth',
    symbol: 'ERTH',
  },
  {
    name: 'Mars',
    symbol: 'MARS',
  },
  {
    name: 'Jupiter',
    symbol: 'JUP',
  },
  {
    name: 'Saturn',
    symbol: 'SAT',
  },
  {
    name: 'Uranus',
    symbol: 'UNS',
  },
  {
    name: 'Neptune',
    symbol: 'NEPT',
  },
  {
    name: 'Pluto',
    symbol: 'PLUT',
  },
];

const dataFeed = ({ account }) => {
  const [tokBalState, setTokBalState] = useState(Array());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onUpdate = async () => {
      let balances = Array();
      for (let token of tokenNames) {
        balances[token['name'].toLowerCase()] = await getBalance(addresses[token['name'].toLowerCase()]);
      }

      setTokBalState(balances);
    };

    const getBalance = async (address) => {
      // Get token balance and mint state
      try {
        if (account) {
          const contractInstance = tokenInstance(address);
          const dec = await contractInstance.decimals();
          const mint = await contractInstance.canMint(account);
          const balance = await contractInstance.balanceOf(account);
          return { balance: (balance.toString() / Math.pow(10, dec)).toFixed(2), mint: mint };
        } else {
          return { balance: 0, mint: false };
        }
      } catch (error) {
        // Could not fetch price return error
        console.log(error);
      }
    };

    let intervalId;
    if (account) {
      intervalId = setInterval(async () => await onUpdate(), 3000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [account]);

  // On Submit Tx
  const onMint = async (address) => {
    // Get Contract Instance for the Corresponding Token
    const contractInstance = tokenInstance(address);

    setLoading(true);

    // Mint Token
    try {
      await contractInstance.mintToken();
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
    return;
  };

  const addToMetamask = async (address, imageURL) => {
    setLoading(true);
    try {
      const contractInstance = tokenInstance(address);
      const dec = await contractInstance.decimals();
      const symbol = await contractInstance.symbol();

      await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: address, // The address that the token is at.
            symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: dec, // The number of decimals in the token
            image: imageURL, // A string url of the token logo
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const renderRows = () => {
    const { Row, Cell } = Table;

    return tokenNames.map((token, index) => {
      let imgName = `/logos/${token['name'].toLowerCase()}.svg`;
      let imgURL = `https://raw.githubusercontent.com/albertov19/moonbase-mintableERC20/main/mintableERC20-interface/public${imgName}`;

      let tokenAddress = addresses[token['name'].toLowerCase()];
      let balance = tokBalState[token['name'].toLowerCase()]?.balance || 'N/A';
      let mintEnabled = tokBalState[token['name'].toLowerCase()]?.mint || false;
      let expURL = `https://moonbase.moonscan.io/token/${tokenAddress}`;
      return (
        <Row key={index}>
          <Cell>{<img src={imgName} style={{ width: 32, height: 32 }} />}</Cell>
          <Cell>{token.name}</Cell>
          <Cell>{token.symbol}</Cell>
          <Cell>{<a href={expURL}>{tokenAddress}</a>}</Cell>
          <Cell>{balance}</Cell>
          <Cell>
            {
              <Form onSubmit={() => onMint(tokenAddress)}>
                <Button type='submit' loading={loading} disabled={loading || !mintEnabled} color='orange'>
                  Mint
                </Button>
              </Form>
            }
          </Cell>
          <Cell>
            {
              <Form onSubmit={() => addToMetamask(tokenAddress, imgURL)}>
                <Button type='submit' loading={loading} disabled={loading} color='orange'>
                  Add
                </Button>
              </Form>
            }
          </Cell>
        </Row>
      );
    });
  };

  const { Header, Row, HeaderCell, Body } = Table;

  return (
    <div>
      <h3>Token Balance Information</h3>
      <p>
        Information displayed in the following table corresponds to your on-chain balance of each of the following ERC20
        tokens on the Moonbase Alpha TestNet! <br />
        Users can mint 100 tokens every hour in each ERC20 token contract. <br />
        There are 8 tokens that represent each planet of the solar system. The 9th token is for Pluto, which is not{' '}
        <a href='https://www.loc.gov/everyday-mysteries/astronomy/item/why-is-pluto-no-longer-a-planet/'>
          considered a planet anymore.
        </a>
      </p>
      <Container>
        <Table textAlign='center'>
          <Header>
            <Row>
              <HeaderCell>Logo</HeaderCell>
              <HeaderCell>Token Name</HeaderCell>
              <HeaderCell>Symbol</HeaderCell>
              <HeaderCell>Address</HeaderCell>
              <HeaderCell>Balance</HeaderCell>
              <HeaderCell>Mint</HeaderCell>
              <HeaderCell>Add to Metamask</HeaderCell>
            </Row>
          </Header>
          <Body>{renderRows()}</Body>

          {/* <tbody>
          <tr>
            <td>
              <img src='/logos/mercury.svg' alt='MercuryLogo' style={{ width: 32, height: 32 }} />
            </td>
            <td data-label='ERC20 Token'>Mercury</td>
            <td data-label='Symbol'>MERC</td>
            <td data-label='ERC20 Token'>{addresses.mercury}</td>
            <td data-label='Balance'>{mercBalState}</td>
            <td data-label='Mint'>{mercMintState}</td>
            <td data-label='AddMetamask'>
              <Form
                onSubmit={() =>
                  addToMetamask(
                    addresses.mercury,
                    'https://raw.githubusercontent.com/albertov19/moonbase-mintableERC20/main/mintableERC20-interface/public/logos/mercury.svg'
                  )
                }
              >
                <Button type='submit' loading={loading} disabled={loading} color='orange'>
                  Add
                </Button>
              </Form>
            </td>
          </tr>
        </tbody> */}
        </Table>
      </Container>
    </div>
  );
};

export default dataFeed;
