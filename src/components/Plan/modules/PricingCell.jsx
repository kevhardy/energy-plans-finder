import React from 'react';
import { Divider, List, Table } from 'semantic-ui-react';

export default React.memo(function PricingCell(props) {
  const { details, eflURL, termsURL } = props;

  /*TODO: parse details more efficiently
  Currently very hacky when details is a per month cancellation fee or $0.00 */
  const cancelFee = details.slice(details.lastIndexOf('$') + 1, details.length);

  return (
    <Table.Cell>
      <List>
        <List.Item>
          <List.Header>Cancellation Fee</List.Header>
          {cancelFee !== '0.00' ? '$' + cancelFee : 'None'}
        </List.Item>
        <Divider hidden />
        <List.Item>
          <List.Header>
            <a href={eflURL} target="_blank" rel="noopener noreferrer">
              Facts Sheet (EFL)
            </a>
          </List.Header>
        </List.Item>
        <List.Item>
          <List.Header>
            <a href={termsURL} target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>
          </List.Header>
        </List.Item>
      </List>
    </Table.Cell>
  );
});
