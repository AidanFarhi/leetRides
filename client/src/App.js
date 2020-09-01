import React from 'react';
import './cmp-styles/App.css';
import Home from './components/Home'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const key = require('./secrets')
const promise = loadStripe(key);

function App() {
  return (
    <div className="App">
      <Elements stripe={promise}>
        <Home />
      </Elements>
    </div>
  );
}

export default App;
