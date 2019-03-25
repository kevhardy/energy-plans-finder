import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../styles/App.css';
import { FormContext } from './FormContext';
import Home from './Home';
import Results from './Results';

export default function App() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleZipSubmit(zipcode) {
    // Regex for 5 digit zip code
    if (!/^[0-9]{5}$/.test(zipcode)) setPlans([]);
    fetchPlans(zipcode);
  }

  async function fetchPlans(zipcode) {
    try {
      setIsLoading(true);
      const ajax = await fetch(
        `https://cors-anywhere.herokuapp.com/http://www.powertochoose.org/en-us/service/v1/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            parameters: {
              method: 'plans',
              zip_code: zipcode
            }
          })
        }
      );
      const data = await ajax.json();
      setPlans(data);
      console.log(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <BrowserRouter>
      <FormContext.Provider value={{ plans, isLoading, handleZipSubmit }}>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/app/results" component={Results} />
        </main>
      </FormContext.Provider>
    </BrowserRouter>
  );
}
