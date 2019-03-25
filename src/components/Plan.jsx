import React from 'react';
import { Table } from 'semantic-ui-react';

export default function Plan(props) {
  const { plan } = props;
  return (
    <Table.Row>
      <Table.Cell>{plan.plan_name}</Table.Cell>
    </Table.Row>
  );
}
