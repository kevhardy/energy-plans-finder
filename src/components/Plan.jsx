import React, { useState, useContext } from 'react';
import { FormContext } from './FormContext';
import {
  Table,
  Header,
  Icon,
  List,
  Accordion,
  Checkbox,
  Rating,
  Popup
} from 'semantic-ui-react';
import '../styles/Plan.css';
import AnimateHeight from 'react-animate-height';

export default function Plan(props) {
  const [active, setActive] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const { compareList, setCompareList } = useContext(FormContext);

  const { sortedState } = props;
  const {
    plan_id,
    company_logo,
    rating_total,
    price_kwh500,
    price_kwh1000,
    price_kwh2000
  } = props.plan;

  function handleClick(e, titleProps) {
    const toggleActive = active === 1 ? 0 : 1;
    setActive(toggleActive);
  }

  function handleCompareClick(e, data) {
    e.preventDefault();
    if (data.checked) {
      setIsChecked(true);
      setCompareList([...compareList, plan_id]);
    } else {
      setIsChecked(false);
      setCompareList(compareList.filter(id => id !== plan_id));
    }
  }

  const accordion = (
    <Accordion className="accordion-cursor" onClick={handleClick}>
      <Accordion.Title
        className={'plan-dropdown' + (active === 1 ? ' hidden' : '')}
        active={active !== 1}
        index={0}
        onClick={handleClick}
      >
        <p
          style={{
            fontSize: '.8rem',
            textAlign: 'center',
            marginBottom: '2px'
          }}
        >
          More Details
        </p>
        <Icon className="dropdown-icon" name="dropdown" />
      </Accordion.Title>
      <Accordion.Content active={active === 1}>
        <AnimateHeight
          animateOpacity
          duration={300}
          height={active ? 'auto' : 0}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos at,
            quae inventore quam laborum voluptates repudiandae cumque? Explicabo
            ducimus aspernatur voluptatibus mollitia, possimus qui eum nobis
            perspiciatis, necessitatibus, aliquam tempore!
          </p>
          <div className="plan-dropdown plan-dropup accordion-cursor">
            <Icon
              className="dropup-icon"
              name="dropdown"
              onClick={handleClick}
            />
          </div>
        </AnimateHeight>
      </Accordion.Content>
    </Accordion>
  );

  return (
    <React.Fragment>
      <Table.Row positive={isChecked}>
        <Table.Cell collapsing verticalAlign="top">
          <div
            style={{ backgroundImage: 'url(' + company_logo + ')' }}
            className="company-logo"
            alt="Company's logo"
          />
          <p style={{ margin: '1rem 0 0' }}>
            Rating{' '}
            <Popup
              trigger={
                <Icon
                  style={{ marginLeft: '1.2rem' }}
                  name="question circle outline"
                />
              }
              content="The Company Rating is based on the ratio of customer complaints a company has received in the past 6 months compared to other companies. The more stars a company has, the lower the complaint ratio."
              position="right center"
            />
          </p>

          {rating_total === 0 || rating_total === -1 ? (
            <p>
              <strong>Not Available</strong>
            </p>
          ) : (
            <Rating
              icon="star"
              defaultRating={rating_total}
              maxRating={5}
              size="small"
              disabled
            />
          )}
        </Table.Cell>
        <Table.Cell />
        <Table.Cell
          positive={
            sortedState.column === '500' &&
            sortedState.direction === 'ascending'
          }
          negative={
            sortedState.column === '500' &&
            sortedState.direction === 'descending'
          }
        >
          <Header as="h3" textAlign="right">
            {price_kwh500.toFixed(1)}¢
          </Header>
        </Table.Cell>
        <Table.Cell
          positive={
            sortedState.column === '1000' &&
            sortedState.direction === 'ascending'
          }
          negative={
            sortedState.column === '1000' &&
            sortedState.direction === 'descending'
          }
        >
          <Header as="h3" textAlign="right">
            {price_kwh1000.toFixed(1)}¢
          </Header>
        </Table.Cell>
        <Table.Cell
          positive={
            sortedState.column === '2000' &&
            sortedState.direction === 'ascending'
          }
          negative={
            sortedState.column === '2000' &&
            sortedState.direction === 'descending'
          }
        >
          <Header as="h3" textAlign="right">
            {price_kwh2000.toFixed(1)}¢
          </Header>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Checkbox onChange={handleCompareClick} />
        </Table.Cell>
      </Table.Row>

      <Table.Row positive={isChecked}>
        <Table.Cell
          colSpan="12"
          className="accordion-row"
          style={{ paddingBottom: '0', paddingTop: '0' }}
        >
          {accordion}
        </Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
}
