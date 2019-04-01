import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { Accordion, Icon, Table } from 'semantic-ui-react';
import PlanDetailsCell from './Plan/modules/PlanDetailsCell';
import PricingCell from './Plan/modules/PricingCell';

export default function DetailsAccordion(props) {
  const [active, setActive] = useState(0);
  const { isChecked } = props;

  const {
    plan_name: planName,
    pricing_details: details,
    renewable_energy_description: renewablePercent,
    term_value: contractLength,
    rate_type: planType,
    fact_sheet: eflURL,
    terms_of_service: termsURL
  } = props.plan;

  // Toggles accordion state
  function handleAccordionClick(e, titleProps) {
    const toggleActive = active === 1 ? 0 : 1;
    setActive(toggleActive);
  }

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
          <PlanDetailsCell
            name={planName}
            renewablePercent={renewablePercent}
            planType={planType}
            contractLength={contractLength}
          />
          <PricingCell details={details} eflURL={eflURL} termsURL={termsURL} />
        </Table.Row>
      </Table.Body>
    </Table>
  );

  return (
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
                className="plan-dropup accordion-cursor"
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
}
