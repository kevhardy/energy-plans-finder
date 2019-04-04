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
            <Table.HeaderCell className="details-header" textAlign="center">
              Plan Details
            </Table.HeaderCell>
            <Table.HeaderCell className="pricing-header" textAlign="center">
              Pricing
            </Table.HeaderCell>
          </React.Fragment>
        )}

        <Table.HeaderCell
          sorted={sortedState.column === '500' ? sortedState.direction : null}
          onClick={() => handleSort('500')}
          collapsing
          textAlign="center"
        >
          500 <br />
          <span className="kwh-header">kWh</span>
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={sortedState.column === '1000' ? sortedState.direction : null}
          onClick={() => handleSort('1000')}
          collapsing
          textAlign="center"
        >
          1000 <br />
          <span className="kwh-header">kWh</span>
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={sortedState.column === '2000' ? sortedState.direction : null}
          onClick={() => handleSort('2000')}
          collapsing
          textAlign="center"
        >
          2000 <br />
          <span className="kwh-header">kWh</span>
        </Table.HeaderCell>
        <Table.HeaderCell className="checkbox-header" />
      </Table.Row>
    </Table.Header>
  );
});
