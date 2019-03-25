import React, { useState } from 'react';
import { Table, Header, Icon, List, Accordion, Form } from 'semantic-ui-react';
import '../styles/Plan.css';

export default function Plan(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    company_logo,
    price_kwh500,
    price_kwh1000,
    price_kwh2000
  } = props.plan;

  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }

  const accordion = (
    <Accordion>
      <Accordion.Title active index={0} onClick={handleClick}>
        <Icon name="dropdown" />
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos at, quae
          inventore quam laborum voluptates repudiandae cumque? Explicabo
          ducimus aspernatur voluptatibus mollitia, possimus qui eum nobis
          perspiciatis, necessitatibus, aliquam tempore!
        </p>
      </Accordion.Content>
    </Accordion>
  );

  return (
    <React.Fragment>
      <Table.Row>
        <Table.Cell verticalAlign="top">
          <div
            style={{ backgroundImage: 'url(' + company_logo + ')' }}
            className="company-logo"
            alt="Company's logo"
          />
        </Table.Cell>
        <Table.Cell>
          <Header as="h3" textAlign="center">
            {price_kwh500}¢
          </Header>
        </Table.Cell>
        <Table.Cell>
          <Header as="h3" textAlign="center">
            {price_kwh1000}¢
          </Header>
        </Table.Cell>
        <Table.Cell>
          <Header as="h3" textAlign="center">
            {price_kwh2000}¢
          </Header>
        </Table.Cell>
        <Table.Cell>
          <Header as="h4" textAlign="center">
            Sign Up
          </Header>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan="12">{accordion}</Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
}
