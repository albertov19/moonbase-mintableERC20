import React, { Component } from 'react';
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
      token: 'pluto',
   }
];
class Table extends Component {
   // Nextjs uses this function to render this first server-side
   static async getInitialProps() {
      getValue();
   }

   // Set Initial State
   state = {
      loading: false,
      value: '',
      errorMessage: '',
   };

   // On Submit Tx
   onSubmit = async (event) => {
      event.preventDefault();

      // Get Contract Instance for the Corresponding Token
      const contractInstance = tokenInstance(addresses[this.state.value]);
      
      this.setState({ loading: true, errorMessage: '' });

      // Mint Token
      try {
         await contractInstance.mintToken();
      } catch (err) {
         this.setState({
            loading: false,
            errorMessage: err.message,
         });
      }
      this.setState({ loading: false });
      return;
   };

   handleChange = (e, { value }) => this.setState({ value })

   render() {
      return (
         <div>
            <h3>Mint Tokens</h3>
            <p>
               Mint 100 tokens (limited to once per hour)
            </p>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
               <Dropdown
                  placeholder='Select Token to Mint'
                  fluid
                  search
                  selection
                  options={tokenNames}
                  onChange={this.handleChange}
               />
               <br />
               <Message
                  error
                  header='Oops!'
                  content={this.state.errorMessage}
               />
               <Button type='submit' loading={this.state.loading} primary>
                  Submit Tx
               </Button>
            </Form>
            <br />
         </div>
      );
   }
}

export default Table;
