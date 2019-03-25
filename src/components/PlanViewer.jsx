import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import { FormContext } from './FormContext';
import Plan from './Plan';

export default function PlanViewer() {
  const { plans } = useContext(FormContext);

  const plansOutput = plans.map(plan => {
    return <Plan key={plan.plan_id} plan={plan} />;
  });

  return (
    <div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Plan Title</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{plansOutput}</Table.Body>
      </Table>
    </div>
  );
}
