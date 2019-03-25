import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../styles/App.css';
import { FormContext } from './FormContext';
import history from '../util/history';
import Home from './Home';
import Results from './Results';

export default function App() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleZipSubmit(zipcode) {
    console.log('zip code submitted.');
  }

  return (
    <BrowserRouter>
      <FormContext.Provider value={{ handleZipSubmit }}>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/app/results" component={Results} />
        </main>
      </FormContext.Provider>
    </BrowserRouter>
  );
}
