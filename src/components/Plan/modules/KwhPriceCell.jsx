import React from 'react';
import { Header, Table } from 'semantic-ui-react';

export default React.memo(function KwhPriceCell(props) {
  const { sortedState, price, priceLevel } = props;

  return (
    <Table.Cell
      positive={
        sortedState.column === priceLevel &&
        sortedState.direction === 'ascending'
      }
      negative={
        sortedState.column === priceLevel &&
        sortedState.direction === 'descending'
      }
    >
      <Header as="h4" textAlign="center">
        {price.toFixed(1)}¢
      </Header>
    </Table.Cell>
  );
});
