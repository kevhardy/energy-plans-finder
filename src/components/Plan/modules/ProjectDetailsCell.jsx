import React from 'react';
import { Table, List } from 'semantic-ui-react';

export default function ProjectDetailsCell(props) {
  const { name } = props;

  return (
    <Table.Cell>
      <List>
        <List.Item>
          <List.Header>Plan Name</List.Header>
          {name}
        </List.Item>
      </List>
    </Table.Cell>
  );
}
