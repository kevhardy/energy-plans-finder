import React, { useContext, useState } from 'react';
import { Checkbox, Table } from 'semantic-ui-react';
import '../../styles/Plan.css';
import DetailsAccordion from '../DetailsAccordion';
import { FormContext } from '../FormContext';
import useWindowWidth from '../hooks/useWindowWidth';
import CompanyCell from './modules/CompanyCell';
import KwhPriceCell from './modules/KwhPriceCell';
import PlanDetailsCell from './modules/PlanDetailsCell';
import PricingCell from './modules/PricingCell';

export default function Plan(props) {
  //Accordion active state (more details)
  const [isChecked, setIsChecked] = useState(false);
  const { compareList, setCompareList } = useContext(FormContext);
  const width = useWindowWidth();

  // Which column and how it's sorted
  const { sortedState } = props;

  // Details of plan for main content
  const {
    plan_id,
    company_logo,
    rating_total,
    price_kwh500,
    price_kwh1000,
    price_kwh2000
  } = props.plan;

  // Details for accordion
  const {
    plan_name: planName,
    pricing_details: details,
    renewable_energy_description: renewablePercent,
    term_value: contractLength,
    rate_type: planType,
    fact_sheet: eflURL,
    terms_of_service: termsURL
  } = props.plan;

  // Either adds or removes comparison click
  // very slow, needs optimizing
  function handleCompareClick(e, data) {
    e.preventDefault();
    console.log(e.target.value);
    if (data.checked) {
      setIsChecked(true);
      setCompareList(compareList.concat([plan_id]));
    } else {
      setIsChecked(false);
      setCompareList(compareList.filter(id => id !== plan_id));
    }
  }

  // JSX for displaying main content of Plan
  const mainPlan = (
    <Table.Row positive={isChecked}>
      <CompanyCell logo={company_logo} rating={rating_total} />

      {width >= 768 && (
        <React.Fragment>
          <PlanDetailsCell
            name={planName}
            renewablePercent={renewablePercent}
            planType={planType}
            contractLength={contractLength}
          />
          <PricingCell details={details} eflURL={eflURL} termsURL={termsURL} />
        </React.Fragment>
      )}

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
        <Checkbox
          name="isChecked"
          checked={isChecked}
          onChange={handleCompareClick}
        />
      </Table.Cell>
    </Table.Row>
  );

  return (
    <React.Fragment>
      {mainPlan}
      {width < 768 && (
        <DetailsAccordion plan={props.plan} isChecked={isChecked} />
      )}
    </React.Fragment>
  );
}
