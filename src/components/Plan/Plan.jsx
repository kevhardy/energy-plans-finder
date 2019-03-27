import React, { useState, useContext } from 'react';
import { FormContext } from '../FormContext';
import { Table, Icon, Accordion, Checkbox } from 'semantic-ui-react';
import CompanyCell from './modules/CompanyCell';
import KwhPriceCell from './modules/KwhPriceCell';
import ProjectDetailsCell from './modules/ProjectDetailsCell';
import '../../styles/Plan.css';
import AnimateHeight from 'react-animate-height';

export default function Plan(props) {
  const [active, setActive] = useState(0); //Accordion active state (more details)
  const [isChecked, setIsChecked] = useState(false); //Compare checked state
  const { compareList, setCompareList } = useContext(FormContext);

  // Which column and how it's sorted
  const { sortedState } = props;

  // All details of current plan
  const {
    plan_id,
    plan_name,
    company_logo,
    rating_total,
    price_kwh500,
    price_kwh1000,
    price_kwh2000
  } = props.plan;

  // Toggles accordion state
  function handleAccordionClick(e, titleProps) {
    const toggleActive = active === 1 ? 0 : 1;
    setActive(toggleActive);
  }

  // Either adds or removes comparison click
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

  // JSX for displaying main content of Plan
  const mainPlan = (
    <Table.Row positive={isChecked}>
      <CompanyCell logo={company_logo} rating={rating_total} />
      <KwhPriceCell
        price={price_kwh500}
        priceLevel={'500'}
        sortedState={sortedState}
      />
      <KwhPriceCell
        price={price_kwh1000}
        priceLevel={'1000'}
        sortedState={sortedState}
      />
      <KwhPriceCell
        price={price_kwh2000}
        priceLevel={'2000'}
        sortedState={sortedState}
      />
      <Table.Cell className="checkbox-cell" textAlign="right" collapsing>
        <Checkbox onChange={handleCompareClick} />
      </Table.Cell>
    </Table.Row>
  );

  // Table of details that goes inside accordion
  const moreDetailsTable = (
    <Table className="details-table" unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Plan Details</Table.HeaderCell>
          <Table.HeaderCell>Pricing</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <ProjectDetailsCell name={plan_name} />
          <Table.Cell>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            esse culpa dicta illo. Sit earum, vitae voluptate repellat hic nihil
            sed, sunt eligendi non commodi ullam corporis distinctio sequi
            natus.
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  // JSX for displaying plan details that get pushed into accordion
  const moreDetails = (
    <Table.Row positive={isChecked}>
      <Table.Cell
        colSpan="12"
        className="accordion-row"
        style={{ padding: '0', paddingTop: '0' }}
      >
        <Accordion className="accordion-cursor">
          <Accordion.Title
            className={'plan-dropdown' + (active === 1 ? ' hidden' : '')}
            active={active !== 1}
            index={0}
            onClick={handleAccordionClick}
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
              {moreDetailsTable}
              <div
                className="plan-dropdown plan-dropup accordion-cursor"
                onClick={handleAccordionClick}
              >
                <Icon
                  className="dropup-icon"
                  name="dropdown"
                  onClick={handleAccordionClick}
                />
              </div>
            </AnimateHeight>
          </Accordion.Content>
        </Accordion>
      </Table.Cell>
    </Table.Row>
  );

  return (
    <React.Fragment>
      {mainPlan}
      {moreDetails}
    </React.Fragment>
  );
}
