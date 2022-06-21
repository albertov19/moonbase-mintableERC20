import React, { useState, useEffect } from 'react';
import { Button, Form, Message, Dropdown } from 'semantic-ui-react';
import tokenInstance from '../ethereum/feed';
const addresses = require('../ethereum/addresses');

const tokenNames = [
  {
    key: 'Mercury',
    text: 'Mercury',
    value: 'mercury',
  },
  {
    key: 'Venus',
    text: 'Venus',
    value: 'venus',
  },
  {
    key: 'Earth',
    text: 'Earth',
    value: 'earth',
  },
  {
    key: 'Mars',
    text: 'Mars',
    value: 'mars',
  },
  {
    key: 'Jupiter',
    text: 'Jupiter',
    value: 'jupiter',
  },
  {
    key: 'Saturn',
    text: 'Saturn',
    value: 'saturn',
  },
  {
    key: 'Uranus',
    text: 'Uranus',
    value: 'uranus',
  },
  {
    key: 'Neptune',
    text: 'Neptune',
    value: 'neptune',
  },
  {
    key: 'Pluto',
    text: 'Pluto',
    value: 'pluto',
  },
];
const mint = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  // On Submit Tx
  const onSubmit = async (event) => {
    event.preventDefault();

    // Get Contract Instance for the Corresponding Token
    const contractInstance = tokenInstance(addresses[value]);

    setLoading(true);
    setErrorMessage('');

    // Mint Token
    try {
      await contractInstance.mintToken();
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
    }
    setLoading(false);
    return;
  };

  const handleChange = (e, { value }) => setValue(value);

  return (
    <div>
      <h3>Mint Tokens</h3>
      <p>Mint 100 tokens (limited to once per hour)</p>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Dropdown
          placeholder='Select Token to Mint'
          fluid
          search
          selection
          options={tokenNames}
          onChange={handleChange}
        />
        <br />
        <Message error header='Oops!' content={errorMessage} />
        <Button type='submit' loading={loading} primary>
          Submit Tx
        </Button>
      </Form>
      <br />
    </div>
  );
};

export default mint;
