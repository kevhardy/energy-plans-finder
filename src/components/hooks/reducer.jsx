import { useReducer } from 'react';

const initialState = {
  plans: [],
  filteredPlans: [],
  comparePlans: [],
  isLoading: false
};

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

        case 'company':
          return {
            ...state,
            filteredPlans: state.filteredPlans.slice().sort((x, y) => {
              const companyA = x.company_name.toLowerCase();
              const companyB = y.company_name.toLowerCase();
              if (companyA < companyB) return -1;
              if (companyA > companyB) return 1;
              return 0;
            })
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

export const getReducer = () => {
  return useReducer(reducer, initialState);
};
