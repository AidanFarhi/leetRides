import React, { useEffect } from 'react';
import './cmp-styles/App.css';
import Home from './components/Home'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const getKey = async() => {
  try {
    const response = await fetch('/key/public')
    const key = await response.json()
    return loadStripe(key.key)
  } catch(er) {console.log(er)}
}

function App() {
  return (
    <div className="App">
      <Elements stripe={getKey()}>
        <Home />
      </Elements>
    </div>
  );
}

export default App;
