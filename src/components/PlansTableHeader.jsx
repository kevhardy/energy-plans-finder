import React from 'react';
import { Table } from 'semantic-ui-react';
import useWindowWidth from './hooks/useWindowWidth';

export default React.memo(function PlansTableHeader(props) {
  const { isLoading, sortedState, handleSort } = props;
  const width = useWindowWidth();

  return (
    <Table.Header>
      <Table.Row disabled={isLoading}>
        <Table.HeaderCell textAlign="left">Company</Table.HeaderCell>

        {width >= 768 && (
          <React.Fragment>
            <Table.HeaderCell textAlign="center">Plan Details</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Pricing</Table.HeaderCell>
          </React.Fragment>
        )}

        <Table.HeaderCell
          sorted={sortedState.column === '500' ? sortedState.direction : null}
          onClick={() => handleSort('500')}
          collapsing
          textAlign="center"
        >
          500
          <p className="kwh-header">kWh</p>
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={sortedState.column === '1000' ? sortedState.direction : null}
          onClick={() => handleSort('1000')}
          collapsing
          textAlign="center"
        >
          1000
          <p className="kwh-header">kWh</p>
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={sortedState.column === '2000' ? sortedState.direction : null}
          onClick={() => handleSort('2000')}
          collapsing
          textAlign="center"
        >
          2000
          <p className="kwh-header">kWh</p>
        </Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>
  );
});
