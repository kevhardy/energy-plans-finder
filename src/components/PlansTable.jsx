import React, { useContext, useEffect, useState } from 'react';
import { Loader, Table } from 'semantic-ui-react';
import '../styles/PlansTable.css';
import { FormContext } from './FormContext';
import useWindowWidth from './hooks/useWindowWidth';
import Plan from './Plan/Plan';
import PlansTableHeader from './PlansTableHeader';

export default function PlansTable() {
  const { state, setPlans } = useContext(FormContext);
  const { plans, filteredPlans, isLoading } = state;
  const [sortedState, setSortState] = useState({
    column: null,
    direction: null
  });
  const width = useWindowWidth();

  useEffect(() => {
    if (isLoading) {
      setSortState({
        column: null,
        direction: null
      });
    }
  });

  function handleSort(clickedColumn) {
    // First time column is clicked, sort ascending
    if (sortedState.column !== clickedColumn) {
      setSortState({
        column: clickedColumn,
        direction: 'ascending'
      });
      switch (clickedColumn) {
        case '500':
          setPlans(plans.sort((x, y) => x.price_kwh500 - y.price_kwh500));
          break;
        case '1000':
          setPlans(plans.sort((x, y) => x.price_kwh1000 - y.price_kwh1000));
          break;
        case '2000':
          setPlans(plans.sort((x, y) => x.price_kwh2000 - y.price_kwh2000));
          break;
        default:
      }
      return;
    }

    // If column is clicked again, reverses order and sets direction state
    setPlans(plans.reverse());
    setSortState({
      column: sortedState.column,
      direction:
        sortedState.direction === 'ascending' ? 'descending' : 'ascending'
    });
  }

  const plansOutput = plans.slice(0, 19).map(plan => {
    return (
      <Plan
        key={plan.plan_id}
        plan={plan}
        sortedState={sortedState}
        width={width}
      />
    );
  });

  return (
    <Table className="plan-table" sortable unstackable>
      <PlansTableHeader
        sortedState={sortedState}
        isLoading={isLoading}
        handleSort={handleSort}
      />
      <Table.Body>
        {isLoading ? (
          <Table.Row>
            <Table.Cell colSpan="12">
              <Loader active={isLoading} inline="centered" />
            </Table.Cell>
          </Table.Row>
        ) : plans.length ? (
          plansOutput
        ) : (
          <Table.Row>
            <Table.Cell colSpan="12">No results found.</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
