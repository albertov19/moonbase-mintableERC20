import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';

import tokenInstance from '../ethereum/feed';

const addresses = require('../ethereum/addresses');

const dataFeed = () => {
  const [mercBalState, setMercBalState] = useState(0);
  const [venBalState, setVenBalState] = useState(0);
  const [erthBalState, setErthBalState] = useState(0);
  const [marsBalState, setMarsBalState] = useState(0);
  const [jupBalState, setJupBalState] = useState(0);
  const [satBalState, setSatBalState] = useState(0);
  const [unsBalState, setUnsBalState] = useState(0);
  const [neptBalState, setNeptBalState] = useState(0);
  const [plutBalState, setPlutBalState] = useState(0);
  const [mercMintState, setMercMintState] = useState(false);
  const [venMintState, setVenMintState] = useState(false);
  const [erthMintState, setErthMintState] = useState(false);
  const [marsMintState, setMarsMintState] = useState(false);
  const [jupMintState, setJupMintState] = useState(false);
  const [satMintState, setSatMintState] = useState(false);
  const [unsMintState, setUnsMintState] = useState(false);
  const [neptMintState, setNeptMintState] = useState(false);
  const [plutMintState, setPlutMintState] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInterval(async () => await onUpdate(), 3000);
  }, []);

  const onUpdate = async () => {
    // Mercury
    const [mercBal, mercMint] = await getBalance(addresses.mercury);
    // Venus
    const [venBal, venMint] = await getBalance(addresses.venus);
    // Earth
    const [erthBal, erthMint] = await getBalance(addresses.earth);
    // Mars
    const [marsBal, marsMint] = await getBalance(addresses.mars);
    // Jupiter
    const [jupBal, jupMint] = await getBalance(addresses.jupiter);
    // Saturn
    const [satBal, satMint] = await getBalance(addresses.saturn);
    // Uranus
    const [unsBal, unsMint] = await getBalance(addresses.uranus);
    // Neptune
    const [neptBal, neptMint] = await getBalance(addresses.neptune);
    // Pluto
    const [plutBal, plutMint] = await getBalance(addresses.pluto);

    // Set Balance
    setMercBalState(mercBal);
    setVenBalState(venBal);
    setErthBalState(erthBal);
    setMarsBalState(marsBal);
    setJupBalState(jupBal);
    setSatBalState(satBal);
    setUnsBalState(unsBal);
    setNeptBalState(neptBal);
    setPlutBalState(plutBal);
    setMercMintState(mercMint);
    setVenMintState(venMint);
    setErthMintState(erthMint);
    setMarsMintState(marsMint);
    setJupMintState(jupMint);
    setSatMintState(satMint);
    setUnsMintState(unsMint);
    setNeptMintState(neptMint);
    setPlutMintState(plutMint);
  };

  const getBalance = async (address) => {
    // Get token balance and mint state
    try {
      const contractInstance = tokenInstance(address);
      const dec = await contractInstance.decimals();
      const mint = await contractInstance.canMint(ethereum.selectedAddress);
      const balance = await contractInstance.balanceOf(ethereum.selectedAddress);
      return [(balance.toString() / Math.pow(10, dec)).toFixed(2), mint.toString()];
    } catch (error) {
      // Could not fetch price return error
      console.log(error);
      return [0, 'N/A'];
    }
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

  return (
    <div>
      <h3>Token Balance Information</h3>
      <p>
        Information displayed in the following table corresponds to your on-chain balance of each of
        the following ERC20 tokens on the Moonbase Alpha TestNet! <br />
        Users can mint 100 tokens every hour in each ERC20 token contract. <br />
        There are 8 tokens that represent each planet of the solar system. The 9th token is for
        Pluto, which is not{' '}
        <a href='https://www.loc.gov/everyday-mysteries/astronomy/item/why-is-pluto-no-longer-a-planet/'>
          considered a planet anymore.
        </a>
      </p>
      <table className='ui celled table' style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Logo</th>
            <th>ERC20 Token Name</th>
            <th>Symbol</th>
            <th>Address</th>
            <th>Balance</th>
            <th>Can Mint?</th>
            <th>Add to Metamask</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src='/logos/mercury.svg' alt='MercuryLogo' style={{ width: 32, height: 32 }} />
            </td>
            <td data-label='ERC20 Token'>Mercury</td>
            <td data-label='Symbol'>MERC</td>
            <td data-label='ERC20 Token'>{addresses.mercury}</td>
            <td data-label='Balance'>{mercBalState}</td>
            <td data-label='Can Mint?'>{mercMintState}</td>
            <td data-label='AddMetamask'>
              <Form
                onSubmit={() =>
                  addToMetamask(
                    addresses.mercury,
                    'https://raw.githubusercontent.com/albertov19/moonbase-mintableERC20/main/mintableERC20-interface/public/logos/mercury.svg'
                  )
                }
              >
                <Button type='submit' loading={loading} color='orange'>
                  Add
                </Button>
              </Form>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <img src='/logos/venus.svg' alt='VenusLogo' style={{ width: 32, height: 32 }} />
            </td>
            <td data-label='ERC20 Token'>Venus</td>
            <td data-label='Symbol'>VEN</td>
            <td data-label='ERC20 Token'>{addresses.venus}</td>
            <td data-label='Balance'>{venBalState}</td>
            <td data-label='Can Mint?'>{venMintState}</td>
            <td data-label='AddMetamask'>
              <Form
                onSubmit={() =>
                  addToMetamask(
                    addresses.venus,
                    'https://raw.githubusercontent.com/albertov19/moonbase-mintableERC20/main/mintableERC20-interface/public/logos/venus.svg'
                  )
                }
              >
                <Button type='submit' loading={loading} color='orange'>
                  Add
                </Button>
              </Form>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <img src='/logos/earth.svg' alt='EarthLogo' style={{ width: 32, height: 32 }} />
            </td>
            <td data-label='ERC20 Token'>Earth</td>
            <td data-label='Symbol'>ERTH</td>
            <td data-label='ERC20 Token'>{addresses.earth}</td>
            <td data-label='Balance'>{erthBalState}</td>
            <td data-label='Can Mint?'>{erthMintState}</td>
            <td data-label='AddMetamask'>
              <Form
                onSubmit={() =>
                  addToMetamask(
                    addresses.earth,
                    'https://raw.githubusercontent.com/albertov19/moonbase-mintableERC20/main/mintableERC20-interface/public/logos/earth.svg'
                  )
                }
              >
                <Button type='submit' loading={loading} color='orange'>
                  Add
                </Button>
              </Form>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <img src='/logos/mars.svg' alt='MarsLogo' style={{ width: 32, height: 32 }} />
            </td>
            <td data-label='ERC20 Token'>Mars</td>
            <td data-label='Symbol'>MARS</td>
            <td data-label='ERC20 Token'>{addresses.mars}</td>
            <td data-label='Balance'>{marsBalState}</td>
            <td data-label='Can Mint?'>{marsMintState}</td>
            <td data-label='AddMetamask'>
              <Form
                onSubmit={
                  (() => addToMetamask(addresses.mars),
                  'https://raw.githubusercontent.com/albertov19/moonbase-mintableERC20/main/mintableERC20-interface/public/logos/mars.svg')
                }
              >
                <Button type='submit' loading={loading} color='orange'>
                  Add
                </Button>
              </Form>
            </td>{' '}
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <img src='/logos/jupiter.svg' alt='JupiterLogo' style={{ width: 32, height: 32 }} />
            </td>
            <td data-label='ERC20 Token'>Jupiter</td>
            <td data-label='Symbol'>JUP</td>
            <td data-label='ERC20 Token'>{addresses.jupiter}</td>
            <td data-label='Balance'>{jupBalState}</td>
            <td data-label='Can Mint?'>{jupMintState}</td>
            <td data-label='AddMetamask'>
              <Form
                onSubmit={
                  (() => addToMetamask(addresses.jupiter),
                  'https://raw.githubusercontent.com/albertov19/moonbase-mintableERC20/main/mintableERC20-interface/public/logos/jupiter.svg')
                }
              >
                <Button type='submit' loading={loading} color='orange'>
                  Add
                </Button>
              </Form>
            </td>{' '}
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <img src='/logos/saturn.svg' alt='SaturnLogo' style={{ width: 32, height: 32 }} />
            </td>
            <td data-label='ERC20 Token'>Saturn</td>
            <td data-label='Symbol'>SAT</td>
            <td data-label='ERC20 Token'>{addresses.saturn}</td>
            <td data-label='Balance'>{satBalState}</td>
            <td data-label='Next Mint'>{satMintState}</td>
            <td data-label='AddMetamask'>
              <Form
                onSubmit={
                  (() => addToMetamask(addresses.saturn),
                  'https://raw.githubusercontent.com/albertov19/moonbase-mintableERC20/main/mintableERC20-interface/public/logos/saturn.svg')
                }
              >
                <Button type='submit' loading={loading} color='orange'>
                  Add
                </Button>
              </Form>
            </td>{' '}
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <img src='/logos/uranus.svg' alt='UranusLogo' style={{ width: 32, height: 32 }} />
            </td>
            <td data-label='ERC20 Token'>Uranus</td>
            <td data-label='Symbol'>UNS</td>
            <td data-label='ERC20 Token'>{addresses.uranus}</td>
            <td data-label='Balance'>{unsBalState}</td>
            <td data-label='Next Mint'>{unsMintState}</td>
            <td data-label='AddMetamask'>
              <Form
                onSubmit={() =>
                  addToMetamask(
                    addresses.uranus,
                    'https://raw.githubusercontent.com/albertov19/moonbase-mintableERC20/main/mintableERC20-interface/public/logos/uranus.svg'
                  )
                }
              >
                <Button type='submit' loading={loading} color='orange'>
                  Add
                </Button>
              </Form>
            </td>{' '}
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <img src='/logos/neptune.svg' alt='NeptuneLogo' style={{ width: 32, height: 32 }} />
            </td>
            <td data-label='ERC20 Token'>Neptune</td>
            <td data-label='Symbol'>NEPT</td>
            <td data-label='ERC20 Token'>{addresses.neptune}</td>
            <td data-label='Balance'>{neptBalState}</td>
            <td data-label='Next Mint'>{neptMintState}</td>
            <td data-label='AddMetamask'>
              <Form
                onSubmit={
                  (() => addToMetamask(addresses.neptune),
                  'https://raw.githubusercontent.com/albertov19/moonbase-mintableERC20/main/mintableERC20-interface/public/logos/neptune.svg')
                }
              >
                <Button type='submit' loading={loading} color='orange'>
                  Add
                </Button>
              </Form>
            </td>{' '}
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <img src='/logos/pluto.svg' alt='PlutoLogo' style={{ width: 32, height: 32 }} />
            </td>
            <td data-label='ERC20 Token'>Pluto</td>
            <td data-label='Symbol'>PLUT</td>
            <td data-label='ERC20 Token'>{addresses.pluto}</td>
            <td data-label='Balance'>{plutBalState}</td>
            <td data-label='Next Mint'>{plutMintState}</td>
            <td data-label='AddMetamask'>
              <Form
                onSubmit={() =>
                  addToMetamask(
                    addresses.pluto,
                    'https://raw.githubusercontent.com/albertov19/moonbase-mintableERC20/main/mintableERC20-interface/public/logos/pluto.svg'
                  )
                }
              >
                <Button type='submit' loading={loading} color='orange'>
                  Add
                </Button>
              </Form>
            </td>{' '}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default dataFeed;
