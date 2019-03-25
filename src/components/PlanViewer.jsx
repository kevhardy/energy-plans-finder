import React, { useContext } from 'react';
import { Table, Loader } from 'semantic-ui-react';
import '../styles/PlanViewer.css';
import { FormContext } from './FormContext';
import Plan from './Plan';

export default function PlanViewer() {
  const { plans, isLoading } = useContext(FormContext);

  const plansOutput = plans.map(plan => {
    return <Plan key={plan.plan_id} plan={plan} />;
  });

  return (
    <div className="plan-viewer">
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company</Table.HeaderCell>
            <Table.HeaderCell>500 kWh</Table.HeaderCell>
            <Table.HeaderCell>1000 kWh</Table.HeaderCell>
            <Table.HeaderCell>2000 kWh</Table.HeaderCell>
            <Table.HeaderCell singleLine>Sign Up</Table.HeaderCell>
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
