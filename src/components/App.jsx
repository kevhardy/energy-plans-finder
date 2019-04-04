import React, { useCallback, useReducer } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../styles/App.css';
import { FormContext } from './FormContext';
import Home from './Home';
import Results from './Results';

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        plans: action.plans,
        filteredPlans: action.plans.slice()
      };
    case 'loading':
      return { ...state, isLoading: !state.isLoading };
    case 'addCompare':
      return { ...state, comparePlans: [...state.comparePlans, action.planID] };
    case 'removeCompare':
      return {
        ...state,
        comparePlans: state.comparePlans.filter(id => id !== action.planID)
      };
    case 'sort':
      switch (action.column) {
        case '500':
          return {
            ...state,
            filteredPlans: state.filteredPlans
              .slice()
              .sort((x, y) => x.price_kwh500 - y.price_kwh500)
          };
        case '1000':
          return {
            ...state,
            filteredPlans: state.filteredPlans
              .slice()
              .sort((x, y) => x.price_kwh1000 - y.price_kwh1000)
          };
        case '2000':
          return {
            ...state,
            filteredPlans: state.filteredPlans
              .slice()
              .sort((x, y) => x.price_kwh2000 - y.price_kwh2000)
          };
        case 'reverse':
          return {
            ...state,
            filteredPlans: state.filteredPlans.slice().reverse()
          };
        default:
          return state;
      }
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
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    plans: [],
    filteredPlans: [],
    comparePlans: [],
    isLoading: false
  });

  const handleZipSubmit = useCallback(async zipcode => {
    dispatch({ type: 'loading' });
    const newPlans = await fetchPlans(zipcode);
    if (newPlans) {
      await dispatch({ type: 'update', plans: newPlans });
    }
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
