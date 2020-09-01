import React from 'react';
import './cmp-styles/App.css';
import Home from './components/Home'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_API_KEY}`);

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <Home />
      </Elements>
    </div>
  );
}

export default App;
