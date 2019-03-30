import React from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react';
import '../styles/Results.css';
import PlansTable from './PlansTable';
import ZipcodeForm from './ZipcodeForm';

export default function Results(props) {
  function goHome() {
    props.history.push('/');
  }

  return (
    <div>
      <Divider hidden />
      <div className="container-header">
        <div className="header-home">
          <Icon name="home" size="large" link onClick={goHome} />
        </div>
        <Header className="header-results" as="h1">
          TX Energy Plans
        </Header>
        <div className="header-spacer" />
      </div>

      <ZipcodeForm />

      <PlansTable />
    </div>
  );
}
