import React, { useEffect } from 'react';
import '../styles/Results.css';
import { Divider, Header, Icon } from 'semantic-ui-react';
import ZipcodeForm from './ZipcodeForm';
import PlanViewer from './PlanViewer';

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
          Texas Energy Plans
        </Header>
        <div className="header-spacer" />
      </div>

      <ZipcodeForm />
      <Divider hidden />
      <PlanViewer />
    </div>
  );
}
