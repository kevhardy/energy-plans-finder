import React, { useCallback } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../styles/App.css';
import { FormContext } from './FormContext';
import Home from './Home';
import { getReducer } from './hooks/reducer';
import Results from './Results';

async function fetchPlans(zipcode) {
  try {
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
    let data = await ajax.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default function App() {
  const [state, dispatch] = getReducer();

  const handleZipSubmit = useCallback(async zipcode => {
    dispatch({ type: 'loading' });
    const newPlans = await fetchPlans(zipcode);
    if (newPlans) {
      await dispatch({ type: 'update', plans: newPlans });
    }
    console.log(newPlans);
    await dispatch({ type: 'loading' });
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <FormContext.Provider
        value={{
          state,
          dispatch,
          handleZipSubmit
        }}
      >
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/app/results" component={Results} />
        </main>
      </FormContext.Provider>
    </BrowserRouter>
  );
}
