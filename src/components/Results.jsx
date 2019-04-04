import React, { useCallback } from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react';
import '../styles/Results.css';
import PlansTable from './PlansTable';
import ZipcodeForm from './ZipcodeForm';

export default function Results(props) {
  const goHome = useCallback(() => {
    props.history.push('/');
  }, []);

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
