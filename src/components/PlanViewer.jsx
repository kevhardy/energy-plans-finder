import React, { useContext, useState } from 'react';
import { Loader, Table } from 'semantic-ui-react';
import '../styles/PlanViewer.css';
import { FormContext } from './FormContext';
import Plan from './Plan/Plan';

export default function PlanViewer() {
  const { plans, setPlans, isLoading } = useContext(FormContext);
  const [sortedState, setSortState] = useState({
    column: null,
    direction: null
  });

  // TODO: sorting plans and then searching for new zipcode will break sort
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

  const plansOutput = plans.slice(0, 20).map(plan => {
    return <Plan key={plan.plan_id} plan={plan} sortedState={sortedState} />;
  });

  return (
    <div className="plan-viewer">
      <Table sortable unstackable>
        <Table.Header>
          <Table.Row disabled={isLoading}>
            <Table.HeaderCell textAlign="left">Company</Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sortedState.column === '500' ? sortedState.direction : null
              }
              onClick={() => handleSort('500')}
              collapsing
              textAlign="center"
            >
              500
              <br />
              <span style={{ fontSize: '.7rem' }}>kWh</span>
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sortedState.column === '1000' ? sortedState.direction : null
              }
              onClick={() => handleSort('1000')}
              collapsing
              textAlign="center"
            >
              1000
              <br />
              <span style={{ fontSize: '.7rem' }}>kWh</span>
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sortedState.column === '2000' ? sortedState.direction : null
              }
              onClick={() => handleSort('2000')}
              collapsing
              textAlign="center"
            >
              2000
              <br />
              <span style={{ fontSize: '.7rem' }}>kWh</span>
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan="12">
                <Loader active={isLoading} inline="centered" />
              </Table.Cell>
            </Table.Row>
          ) : plansOutput.length ? (
            plansOutput
          ) : (
            <Table.Row>
              <Table.Cell>{'No results found.'}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
