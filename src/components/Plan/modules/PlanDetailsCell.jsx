import React from 'react';
import { List, Table } from 'semantic-ui-react';

export default React.memo(function PlanDetailsCell(props) {
  const { name, contractLength, planType, renewablePercent } = props;

  return (
    <Table.Cell className="details-cell" singleLine>
      <List>
        <List.Item>
          <List.Header>Plan Name</List.Header>
          {name.length < 26 ? name : name.slice(0, 25) + '...'}
        </List.Item>
        <List.Item>
          <List.Header>Contract Length</List.Header>
          {contractLength ? contractLength + ' month' : 'None'}
          {contractLength > 1 ? 's' : ''}
        </List.Item>
        <List.Item>
          <List.Header>Plan Type</List.Header>
          {planType} Rate
        </List.Item>
        <List.Item>
          <List.Header>Renewable Energy</List.Header>
          {renewablePercent}
        </List.Item>
      </List>
    </Table.Cell>
  );
});
