import React, { useCallback, useReducer } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../styles/App.css';
import { FormContext } from './FormContext';
import Home from './Home';
import Results from './Results';

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return { ...state, plans: action.plans };
    case 'loading':
      return { ...state, isLoading: !state.isLoading };
    case 'addCompare':
      return { ...state, comparePlans: [...state.comparePlans, action.planID] };
    case 'removeCompare':
      return {
        ...state,
        comparePlans: state.comparePlans.filter(id => id !== action.planID)
      };
    default:
      return state;
  }
}

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
    console.dir(data);
    return data;
  } catch (e) {
    console.error(e);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    plans: [],
    comparePlans: [],
    isLoading: false
  });

  const handleZipSubmit = useCallback(async zipcode => {
    dispatch({ type: 'loading' });
    const newPlans = await fetchPlans(zipcode);
    dispatch({ type: 'update', plans: newPlans });
    dispatch({ type: 'loading' });
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
